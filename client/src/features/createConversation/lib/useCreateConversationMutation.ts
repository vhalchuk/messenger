import { useMutation } from '@apollo/client';
import { CREATE_CONVERSATION } from '@/entities/conversation';
import {
  CreateConversationData,
  CreateConversationInput,
} from '@/shared/types/conversationTypes';

export const useCreateConversationMutation = () => {
  return useMutation<CreateConversationData, CreateConversationInput>(
    CREATE_CONVERSATION
  );
};
