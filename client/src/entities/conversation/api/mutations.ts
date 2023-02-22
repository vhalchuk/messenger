import { gql } from '@apollo/client';

export const CREATE_CONVERSATION = gql`
  mutation CreateConversation($participantIds: [String]!) {
    createConversation(participantIds: $participantIds) {
      conversationId
    }
  }
`;
