import { useEffect } from 'react';
import { MESSAGE_SENT } from '../api/subscriptions';
import type { MessagesSubscriptionData } from '../model/types';
import { useMessagesQuery } from './useMessagesQuery';

export const useMessagesSubscription = (
  conversationId: string,
  userId: string
) => {
  const { subscribeToMore } = useMessagesQuery({
    variables: {
      conversationId,
    },
  });

  useEffect(() => {
    const subscription = subscribeToMore({
      document: MESSAGE_SENT,
      variables: {
        conversationId,
      },
      updateQuery: (prev, { subscriptionData }: MessagesSubscriptionData) => {
        if (!subscriptionData.data) return prev;

        const newMessage = subscriptionData.data.messageSent;

        return Object.assign({}, prev, {
          messages:
            newMessage.sender.id === userId
              ? prev.messages
              : [newMessage, ...prev.messages],
        });
      },
    });

    return () => subscription();
  }, [conversationId, subscribeToMore, userId]);
};
