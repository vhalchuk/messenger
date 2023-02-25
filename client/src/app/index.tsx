import { ApolloProvider } from '@apollo/client';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { apolloClient } from './apollo-client';
import { theme } from './chakra';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Box height="100dvh">
            <Component {...pageProps} />
          </Box>
          <Toaster />
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
