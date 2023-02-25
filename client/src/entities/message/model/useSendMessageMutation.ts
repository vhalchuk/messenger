import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../api/mutations';
import type { SendMessageVariables } from './types';

export const useSendMessageMutation = () => {
  return useMutation<{ sendMessage: boolean }, SendMessageVariables>(
    SEND_MESSAGE
  );
};
