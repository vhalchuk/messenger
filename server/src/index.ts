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
import {GraphQLContext} from "./util/types";
import {PrismaClient} from "@prisma/client";
import {getSession} from "next-auth/react";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}

const prisma = new PrismaClient();

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
            }
        }
    }),
);

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);

