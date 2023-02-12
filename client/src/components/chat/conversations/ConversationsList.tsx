import {type FC} from 'react';
import {Box} from "@chakra-ui/react";
import {ConversationsModal} from "@/components/chat/conversations/modal/ConversationsModal";
import {Button} from "@chakra-ui/button";
import {useCreateConversationModalContext} from "@/components/chat/conversations/modal/CreateConversationModalProvider";
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
    const { openModal } = useCreateConversationModalContext();

    return (
        <Box width='100%'>
            <Button
                onClick={openModal}
                width="100%"
            >
                Find or start a conversation
            </Button>
            <ConversationsModal />
            {conversations.map((conversation) => (
                <ConversationItem conversation={conversation} key={conversation.id} />
            ))}
        </Box>
    );
};
