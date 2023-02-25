import { useMutation } from '@apollo/client';
import { CREATE_CONVERSATION } from '../api/mutations';
import type {
  CreateConversationData,
  CreateConversationInput,
} from '../model/types';

export const useCreateConversationMutation = () => {
  return useMutation<CreateConversationData, CreateConversationInput>(
    CREATE_CONVERSATION
  );
};
