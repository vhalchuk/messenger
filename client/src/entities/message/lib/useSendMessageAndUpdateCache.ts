import {
  MessagesData,
  SendMessageVariables,
} from '@/shared/types/messageTypes';
import { GET_MESSAGES } from '../api/queries';
import { useSendMessageMutation } from './useSendMessageMutation';

export const useSendMessageAndUpdateCache = () => {
  const [sendMessage] = useSendMessageMutation();

  return ({
    conversationId,
    newMessage,
    sender,
  }: {
    conversationId: string;
    newMessage: SendMessageVariables;
    sender: {
      id: string;
      username: string;
    };
  }) =>
    sendMessage({
      variables: {
        ...newMessage,
      },
      optimisticResponse: {
        sendMessage: true,
      },
      update: (cache) => {
        const existing = cache.readQuery<MessagesData>({
          query: GET_MESSAGES,
          variables: { conversationId },
        }) as MessagesData;

        cache.writeQuery<MessagesData, { conversationId: string }>({
          query: GET_MESSAGES,
          variables: { conversationId },
          data: {
            ...existing,
            messages: [
              {
                id: newMessage.id,
                body: newMessage.body,
                senderId: newMessage.id,
                conversationId,
                sender,
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
              },
              ...existing.messages,
            ],
          },
        });
      },
    });
};
