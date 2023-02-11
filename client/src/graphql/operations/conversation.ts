import {gql} from "@apollo/client";

const operation = {
    Queries: {},
    Mutations: {
        createConversation: gql`
            mutation CreateConversation($participantIds: [String]!) {
                createConversation(participantIds: $participantIds) {
                    conversationId
                }
            }
        `
    },
    Subscriptions: {},
}

export default operation;
