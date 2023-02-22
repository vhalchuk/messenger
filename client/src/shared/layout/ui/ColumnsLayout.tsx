import { type FC, ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type ColumnsLayoutComponent = {
  LeftColumn: FC<{ children: ReactNode }>;
  RightColumn: FC<{ children: ReactNode }>;
} & FC<{ children: ReactNode }>;

export const ColumnsLayout: ColumnsLayoutComponent = ({ children }) => {
  return <Flex height="100%">{children}</Flex>;
};

ColumnsLayout.LeftColumn = function ColumnsLayoutLeftColumn({ children }) {
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <Box
      width={{
        base: '100%',
        md: '400px',
      }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
      display={{ base: conversationId ? 'none' : 'block', md: 'block' }}
      flexShrink={0}
    >
      {children}
    </Box>
  );
};

ColumnsLayout.RightColumn = function ColumnsLayoutRightColumn({ children }) {
  return (
    <Box height="100%" width="100%">
      {children}
    </Box>
  );
};
