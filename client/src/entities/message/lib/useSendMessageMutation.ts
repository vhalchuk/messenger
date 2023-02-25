import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../api/mutations';
import type { SendMessageVariables } from '../model/types';

export const useSendMessageMutation = () => {
  return useMutation<{ sendMessage: boolean }, SendMessageVariables>(
    SEND_MESSAGE
  );
};
