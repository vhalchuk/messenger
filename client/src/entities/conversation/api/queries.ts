import {gql} from "@apollo/client";
import {conversationFields} from "../config/conversationFields";

export const GET_CONVERSATIONS = gql`
    query Conversations {
        conversations {
            ${conversationFields}
        }
    }
`;
