import { gql } from '@apollo/client';

export const CREATE_CONVERSATION = gql`
  mutation CreateConversation($participantIds: [String]!) {
    createConversation(participantIds: $participantIds) {
      conversationId
    }
  }
`;

export const MARK_CONVERSATION_AS_READ = gql`
  mutation MarkConversationAsRead($userId: String!, $conversationId: String!) {
    markConversationAsRead(userId: $userId, conversationId: $conversationId)
  }
`;

export const DELETE_CONVERSATION = gql`
  mutation DeleteConversation($conversationId: String!) {
    deleteConversation(conversationId: $conversationId)
  }
`;

export const UPDATE_PARTICIPANTS = gql`
  mutation UpdateParticipants(
    $conversationId: String!
    $participantIds: [String]!
  ) {
    updateParticipants(
      conversationId: $conversationId
      participantIds: $participantIds
    )
  }
`;
