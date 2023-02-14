export const conversationFields = `
  id
  updatedAt
  participants {
    user {
      id
      username
    }
    hasSeenLatestMessage
  }
  latestMessage {
    id
    sender {
        id
        username
    }
    body
    createdAt
  }
`;
