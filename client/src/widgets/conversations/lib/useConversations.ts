import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo } from 'react';
import { ConversationPopulated } from '@server/util/types';
import {
  CONVERSATION_CREATED,
  GET_CONVERSATIONS,
} from '@/entities/conversation';
import { ConversationsData } from '@/shared/types/conversationTypes';
import { SubscriptionData } from '../config/types';

const CONVERSATIONS_PLACEHOLDER: ConversationPopulated[] = [];

export const useConversations = () => {
  const { data, subscribeToMore } =
    useQuery<ConversationsData>(GET_CONVERSATIONS);
  const { conversations = CONVERSATIONS_PLACEHOLDER } = data ?? {};

  const handleConversationCreated = useCallback(
    (subscriptionData: SubscriptionData) => {
      const { conversationCreated } = subscriptionData.data ?? {};
      if (conversationCreated) {
        const updatedConversations = [conversationCreated, ...conversations];
        return { conversations: updatedConversations };
      }
      return null;
    },
    [conversations]
  );

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: CONVERSATION_CREATED,
      updateQuery: (
        prev,
        { subscriptionData }: { subscriptionData: SubscriptionData }
      ) => handleConversationCreated(subscriptionData) ?? prev,
    });

    return () => unsubscribe();
  }, [handleConversationCreated, subscribeToMore]);

  return useMemo(() => conversations, [conversations]);
};
