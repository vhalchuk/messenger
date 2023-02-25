import { ConversationPopulated } from '@server/util/types';
import {
  useConversationsQuery,
  useUpdateParticipantsMutation,
} from '@/entities/conversation';

export const useLeaveConversationAndUpdateCache = () => {
  const [updateParticipants] = useUpdateParticipantsMutation();
  const { refetch } = useConversationsQuery();

  return async (conversation: ConversationPopulated, userId: string) => {
    const participantIds = conversation.participants
      .filter((p) => p.user.id !== userId)
      .map((p) => p.user.id);

    await updateParticipants({
      variables: {
        conversationId: conversation.id,
        participantIds,
      },
    });

    return refetch();
  };
};
