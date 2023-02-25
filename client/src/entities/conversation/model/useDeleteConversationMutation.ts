import { useMutation } from '@apollo/client';
import { DELETE_CONVERSATION } from '../api/mutations';

export const useDeleteConversationMutation = () => {
  return useMutation<
    { deleteConversation: boolean },
    { conversationId: string }
  >(DELETE_CONVERSATION);
};
