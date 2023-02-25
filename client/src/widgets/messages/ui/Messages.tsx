import { Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { type FC } from 'react';
import toast from 'react-hot-toast';
import { useMessagesQuery } from '@/entities/message';
import { useMessagesSubscription } from '@/entities/message';
import { MessageItem } from './MessageItem';

export const Messages: FC = () => {
  const conversationId = useRouter().query.conversationId as string;
  const { data: session } = useSession();
  const user = session!.user;

  const { data } = useMessagesQuery({
    variables: {
      conversationId,
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  useMessagesSubscription(conversationId, user.id);

  return (
    <Flex direction="column" justify="flex-end" overflow="hidden">
      {data?.messages && (
        <Flex direction="column-reverse" overflowY="scroll" height="100%">
          {data.messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              isAuthor={message.sender.id === user.id}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};
