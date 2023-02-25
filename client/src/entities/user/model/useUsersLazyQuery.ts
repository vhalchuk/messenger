import { useLazyQuery } from '@apollo/client';
import { GET_USERS } from '../api/queries';
import type { SearchUsersData, SearchUsersInput } from './types';

export const useUsersLazyQuery = () => {
  return useLazyQuery<SearchUsersData, SearchUsersInput>(GET_USERS);
};
