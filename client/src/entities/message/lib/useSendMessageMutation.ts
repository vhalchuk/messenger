import { useMutation } from '@apollo/client';
import { SendMessageVariables } from '@/shared/types/messageTypes';
import { SEND_MESSAGE } from '../api/mutations';

export const useSendMessageMutation = () => {
  return useMutation<{ sendMessage: boolean }, SendMessageVariables>(
    SEND_MESSAGE
  );
};
