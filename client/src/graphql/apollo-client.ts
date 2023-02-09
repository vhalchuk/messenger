import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { env } from '@/env/client.mjs';

const httpLink = new HttpLink({
    uri: env.NEXT_PUBLIC_API_URI,
    credentials: 'include'
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})
