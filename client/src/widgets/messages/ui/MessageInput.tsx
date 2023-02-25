import { Box, Input } from '@chakra-ui/react';
import { ObjectID } from 'bson';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FC, useState } from 'react';
import toast from 'react-hot-toast';
import { useSendMessageAndUpdateCache } from '@/entities/message';
import { SendMessageVariables } from '@/shared/types/messageTypes';

export const MessageInput: FC = () => {
  const conversationId = useRouter().query.conversationId as string;
  const { data: session } = useSession();
  const user = session!.user;

  const [messageBody, setMessageBody] = useState('');

  const sendMessageAndUpdateCache = useSendMessageAndUpdateCache();

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newMessage: SendMessageVariables = {
        id: new ObjectID().toString(),
        senderId: user.id,
        conversationId,
        body: messageBody,
      };
      const sender = {
        id: user.id,
        username: user.username!,
      };

      const { data, errors } = await sendMessageAndUpdateCache({
        conversationId,
        newMessage,
        sender,
      });

      if (!data?.sendMessage || errors) {
        toast.error('Error sending message');
      }
    } catch (error: any) {
      console.log('onSendMessage error', error);
      toast.error(error?.message);
    } finally {
      setMessageBody('');
    }
  };

  return (
    <Box px={4} py={6} width="100%">
      <form onSubmit={onSendMessage}>
        <Input
          value={messageBody}
          onChange={(event) => setMessageBody(event.target.value)}
          size="md"
          placeholder="New message"
          color="whiteAlpha.900"
          resize="none"
          _focus={{
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'whiteAlpha.300',
          }}
          _hover={{
            borderColor: 'whiteAlpha.300',
          }}
        />
      </form>
    </Box>
  );
};
