import { type FC } from 'react';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import { MessagesHeader } from './MessagesHeader';
import { Messages } from './Messages';
import { MessageInput } from './MessageInput';

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
