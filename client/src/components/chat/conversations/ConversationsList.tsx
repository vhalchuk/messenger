import {type FC} from 'react';
import {Box} from "@chakra-ui/react";
import {ConversationsModal} from "@/components/chat/conversations/modal/ConversationsModal";
import {ConversationPopulated} from '../../../../../server/src/util/types';
import {ConversationItem} from "@/components/chat/conversations/ConversationItem";

type ConversationsListProps = {
    conversations: ConversationPopulated[]
}

export const ConversationsList: FC<ConversationsListProps> = (
    {
        conversations
    }
) => {
    return (
        <Box width='100%'>
            <ConversationsModal />
            {conversations.map((conversation) => (
                <ConversationItem conversation={conversation} key={conversation.id} />
            ))}
        </Box>
    );
};
