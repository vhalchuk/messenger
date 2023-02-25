import { useMemo } from 'react';
import { ConversationPopulated } from '@server/util/types';
import {
  useConversationsQuery,
  useConversationsSubscription,
} from '@/entities/conversation';

const CONVERSATIONS_PLACEHOLDER: ConversationPopulated[] = [];

export const useConversations = () => {
  const { data } = useConversationsQuery();
  const { conversations = CONVERSATIONS_PLACEHOLDER } = data ?? {};

  useConversationsSubscription();

  return useMemo(() => conversations, [conversations]);
};
