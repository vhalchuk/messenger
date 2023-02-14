import {ConversationPopulated} from '../../../../server/src/util/types';

export type ConversationsData = {
    conversations: ConversationPopulated[];
}

export type CreateConversationData = {
    createConversation: {
        conversationId: string;
    }
}
export type CreateConversationInput = {
    participantIds: string[];
}
