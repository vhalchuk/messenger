import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { type FC } from 'react';
import { MessageInput } from './MessageInput';
import { Messages } from './Messages';
import { MessagesHeader } from './MessagesHeader';

export const MessagesWidget: FC = () => {
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <Flex
      display={{
        base: conversationId ? 'flex' : 'none',
        md: 'flex',
      }}
      direction="column"
      width="100%"
      height="100%"
    >
      {conversationId && (
        <>
          <Flex
            direction="column"
            justify="space-between"
            overflow="hidden"
            flexGrow={1}
          >
            <MessagesHeader />
            <Messages />
          </Flex>
          <MessageInput />
        </>
      )}
    </Flex>
  );
};
