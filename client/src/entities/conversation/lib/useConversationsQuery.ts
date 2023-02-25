import { useQuery } from '@apollo/client';
import { GET_CONVERSATIONS } from '../api/queries';
import { ConversationsData } from '../model/types';

export const useConversationsQuery = () => {
  return useQuery<ConversationsData>(GET_CONVERSATIONS);
};
