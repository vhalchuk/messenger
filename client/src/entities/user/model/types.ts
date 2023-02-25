export type CreateUsernameData = {
  createUsername: {
    success: boolean;
    error: string;
  };
};

export type CreateUsernameVariables = {
  username: string;
};

export type SearchUsersInput = {
  username: string;
};

export type SearchUsersData = {
  searchUsers: SearchedUser[];
};

export type SearchedUser = {
  id: string;
  username: string;
};
