import { Button, Stack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { type FC } from 'react';
import { useConversationsQuery } from '@/entities/conversation';
import { formatUsernames } from '@/entities/conversation';
import { env } from '@/shared/env/client.mjs';

export const MessagesHeader: FC = () => {
  const router = useRouter();
  const { conversationId } = router.query;
  const { data: session } = useSession();
  const { data, loading } = useConversationsQuery();

  const conversation = data?.conversations.find(
    (conversation) => conversation.id === conversationId
  );

  if (data?.conversations && !loading && !conversation) {
    router.replace(env.NEXT_PUBLIC_API_URI);
  }

  return (
    <Stack
      direction="row"
      align="center"
      spacing={6}
      py={5}
      px={{ base: 4, md: 0 }}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Button
        display={{ md: 'none' }}
        onClick={() =>
          router.replace('?conversationId', '/', {
            shallow: true,
          })
        }
      >
        Back
      </Button>
      {!conversation && !loading && <Text>Conversation Not Found</Text>}
      {conversation && (
        <Stack direction="row">
          <Text color="whiteAlpha.600">To: </Text>
          <Text fontWeight={600}>
            {formatUsernames(conversation.participants, session!.user.id)}
          </Text>
        </Stack>
      )}
    </Stack>
  );
};
