import { useMutation } from '@apollo/client';
import { CREATE_USERNAME } from '../api/mutations';
import type {
  CreateUsernameData,
  CreateUsernameVariables,
} from '../model/types';

export const useCreateUsernameMutation = () => {
  return useMutation<CreateUsernameData, CreateUsernameVariables>(
    CREATE_USERNAME
  );
};
