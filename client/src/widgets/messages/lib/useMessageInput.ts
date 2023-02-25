import { ObjectID } from 'bson';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { useSendMessageAndUpdateCache } from '@/entities/message';
import { SendMessageVariables } from '@/entities/message';

export const useMessageInput = () => {
  const conversationId = useRouter().query.conversationId as string;
  const { data: session } = useSession();
  const user = session!.user;

  const [messageBody, setMessageBody] = useState('');

  const sendMessageAndUpdateCache = useSendMessageAndUpdateCache();

  const handleSend: FormEventHandler = async (event) => {
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

      setMessageBody('');

      const { data, errors } = await sendMessageAndUpdateCache({
        conversationId,
        newMessage,
        sender,
      });

      if (!data?.sendMessage || errors) {
        toast.error('Error sending message');
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return {
    messageBody,
    setMessageBody,
    handleSend,
  };
};
