import { useQuery } from '@apollo/client';
import { ConversationsData } from '@/shared/types/conversationTypes';
import { GET_CONVERSATIONS } from '../api/queries';

export const useConversationsQuery = () => {
  return useQuery<ConversationsData>(GET_CONVERSATIONS);
};
