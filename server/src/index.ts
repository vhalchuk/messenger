import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const server = new ApolloServer({ schema });

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
