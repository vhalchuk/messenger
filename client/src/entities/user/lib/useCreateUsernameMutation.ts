import { useMutation } from '@apollo/client';
import {
  CreateUsernameData,
  CreateUsernameVariables,
} from '@/shared/types/userTypes';
import { CREATE_USERNAME } from '../api/mutations';

export const useCreateUsernameMutation = () => {
  return useMutation<CreateUsernameData, CreateUsernameVariables>(
    CREATE_USERNAME
  );
};
