import {gql} from "@apollo/client";
import {conversationFields} from "../config/conversationFields";

export const CONVERSATION_CREATED = gql`
    subscription ConversationCreated {
        conversationCreated {
            ${conversationFields}
        }
    }
`;
