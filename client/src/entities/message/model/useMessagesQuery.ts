import { useQuery } from '@apollo/client';
import { QueryHookOptions } from '@apollo/client/react/types/types';
import { GET_MESSAGES } from '../api/queries';
import type { MessagesData, MessagesVariables } from './types';

export const useMessagesQuery = (
  options?: QueryHookOptions<MessagesData, MessagesVariables>
) => {
  return useQuery<MessagesData, MessagesVariables>(GET_MESSAGES, options);
};
