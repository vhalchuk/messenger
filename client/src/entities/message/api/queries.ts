import {gql} from "@apollo/client";
import {messageFields} from "../config/messageFields";

export const GET_MESSAGES = gql`
    query Messages($conversationId: String!) {
        messages(conversationId: $conversationId) {
            ${messageFields}
        }
    }
`;
