import { gql } from '@apollo/client';
import { conversationFields } from '../config/conversationFields';

export const CONVERSATION_CREATED = gql`
    subscription ConversationCreated {
        conversationCreated {
            ${conversationFields}
        }
    }
`;

export const CONVERSATION_UPDATED = gql`
    subscription ConversationUpdated {
        conversationUpdated {
            conversation {
                ${conversationFields}
            }
            addedUserIds
            removedUserIds
        }
    }
`;

export const CONVERSATION_DELETED = gql`
  subscription ConversationDeleted {
    conversationDeleted {
      id
    }
  }
`;
