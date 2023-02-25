import { useCallback, useEffect } from 'react';
import { ConversationPopulated } from '@server/util/types';
import { CONVERSATION_CREATED } from '../api/subscriptions';
import { useConversationsQuery } from './useConversationsQuery';

type SubscriptionData = {
  data: { conversationCreated: ConversationPopulated };
};

export const useConversationsSubscription = () => {
  const { subscribeToMore } = useConversationsQuery();

  const handleConversationCreated = useCallback(
    (
      subscriptionData: SubscriptionData,
      conversations: ConversationPopulated[]
    ) => {
      const { conversationCreated } = subscriptionData.data ?? {};
      if (conversationCreated) {
        return [conversationCreated, ...conversations];
      }
      return conversations;
    },
    []
  );

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: CONVERSATION_CREATED,
      updateQuery: (
        prev,
        { subscriptionData }: { subscriptionData: SubscriptionData }
      ) => {
        const { conversations = [] } = prev ?? {};
        return {
          conversations: handleConversationCreated(
            subscriptionData,
            conversations
          ),
        };
      },
    });

    return () => unsubscribe();
  }, [handleConversationCreated, subscribeToMore]);

  return null;
};
