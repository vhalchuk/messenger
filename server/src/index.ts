import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import {ApolloServer} from '@apollo/server';
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers';
import {makeExecutableSchema} from '@graphql-tools/schema'
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import {expressMiddleware} from "@apollo/server/express4";
import * as dotenv from 'dotenv';
import {GraphQLContext, SubscriptionContext} from "./util/types";
import {PrismaClient} from "@prisma/client";
import {getSession} from "next-auth/react";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const prisma = new PrismaClient();
const pubsub = new PubSub();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql/subscriptions',
});

const serverCleanup = useServer({
    schema,
    context: async (ctx: SubscriptionContext): Promise<GraphQLContext> => {
        const { session } = ctx.connectionParams;

        return {
            session,
            prisma,
            pubsub,
        }
    }
}, wsServer);

const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});
await server.start();

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}

app.use(
    '/graphql',
    cors<cors.CorsRequest>(corsOptions),
    bodyParser.json(),
    expressMiddleware(server, {
        context: async ({ req }): Promise<GraphQLContext> => {
            const session = await getSession({ req });

            return {
                session,
                prisma,
                pubsub,
            }
        }
    }),
);

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);

