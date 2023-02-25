import { useMutation } from '@apollo/client';
import {
  CreateConversationData,
  CreateConversationInput,
} from '@/shared/types/conversationTypes';
import { CREATE_CONVERSATION } from '../api/mutations';

export const useCreateConversationMutation = () => {
  return useMutation<CreateConversationData, CreateConversationInput>(
    CREATE_CONVERSATION
  );
};
