import { gql } from '@apollo/client';
import { messageFields } from '../config/messageFields';

export const MESSAGE_SENT = gql`
    subscription MessageSent($conversationId: String!) {
        messageSent(conversationId: $conversationId) {
            ${messageFields}
        }
    }
`;
