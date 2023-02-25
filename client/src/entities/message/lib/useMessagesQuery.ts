import { useQuery } from '@apollo/client';
import { QueryHookOptions } from '@apollo/client/react/types/types';
import { MessagesData, MessagesVariables } from '@/shared/types/messageTypes';
import { GET_MESSAGES } from '../api/queries';

export const useMessagesQuery = (
  options?: QueryHookOptions<MessagesData, MessagesVariables>
) => {
  return useQuery<MessagesData, MessagesVariables>(GET_MESSAGES, options);
};
