import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { env } from '@/shared/env/client.mjs';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { getSession } from 'next-auth/react';

const httpLink = new HttpLink({
  uri: env.NEXT_PUBLIC_API_URI,
  credentials: 'include',
});

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: env.NEXT_PUBLIC_WS_URI,
          connectionParams: async () => ({
            session: await getSession(),
          }),
        })
      )
    : null;

const link = wsLink
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);

        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
