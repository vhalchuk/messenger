import { useLazyQuery } from '@apollo/client';
import { SearchUsersData, SearchUsersInput } from '@/shared/types/userTypes';
import { GET_USERS } from '../api/queries';

export const useUsersLazyQuery = () => {
  return useLazyQuery<SearchUsersData, SearchUsersInput>(GET_USERS);
};
