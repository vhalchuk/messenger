import { useMutation } from '@apollo/client';
import { CREATE_CONVERSATION } from '../api/mutations';
import type { CreateConversationData, CreateConversationInput } from './types';

export const useCreateConversationMutation = () => {
  return useMutation<CreateConversationData, CreateConversationInput>(
    CREATE_CONVERSATION
  );
};
