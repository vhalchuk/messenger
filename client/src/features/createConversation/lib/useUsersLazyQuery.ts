import { useLazyQuery } from '@apollo/client';
import { GET_USERS } from '@/entities/user';
import { SearchUsersData, SearchUsersInput } from '@/shared/types/userTypes';

export const useUsersLazyQuery = () => {
  return useLazyQuery<SearchUsersData, SearchUsersInput>(GET_USERS);
};
