import {
  useConversationsQuery,
  useDeleteConversationMutation,
} from '@/entities/conversation';

export const useDeleteConversationAndUpdateCache = () => {
  const [deleteConversation] = useDeleteConversationMutation();
  const { refetch } = useConversationsQuery();

  return async (conversationId: string) => {
    await deleteConversation({
      variables: {
        conversationId: conversationId,
      },
    });

    return refetch();
  };
};
