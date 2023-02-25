import { useMutation } from '@apollo/client';
import { UPDATE_PARTICIPANTS } from '../api/mutations';

export const useUpdateParticipantsMutation = () => {
  return useMutation<
    { updateParticipants: boolean },
    { conversationId: string; participantIds: Array<string> }
  >(UPDATE_PARTICIPANTS);
};
