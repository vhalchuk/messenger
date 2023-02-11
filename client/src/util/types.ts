export type CreateUsernameData = {
    createUsername: {
        success: boolean;
        error: string;
    };
}

export type CreateUsernameVariables = {
    username: string;
}

export type SearchUsersInput = {
    username: string;
}

export type SearchUsersData = {
    searchUsers: SearchedUser[]
}

export type SearchedUser = {
    id: string;
    username: string;
}

export type CreateConversationData = {
    createConversation: {
        conversationId: string;
    }
}

export type CreateConversationInput = {
    participantIds: string[];
}
