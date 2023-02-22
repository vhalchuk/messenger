import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/app/chakra';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/app/apollo-client';
import { Toaster } from 'react-hot-toast';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={client}>
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
