import {type FC} from 'react';
import {Box} from "@chakra-ui/react";
import {ConversationsModal} from "@/components/chat/conversations/modal/ConversationsModal";
import {ConversationPopulated, ParticipantPopulated} from '../../../../../server/src/util/types';
import {ConversationItem} from "@/components/chat/conversations/ConversationItem";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

type ConversationsListProps = {
    conversations: Array<ConversationPopulated>;
    onViewConversation: (
        conversationId: string,
        // hasSeenLatestMessage: boolean
    ) => void;
}

export const ConversationsList: FC<ConversationsListProps> = (
    {
        conversations,
        onViewConversation,
    }
) => {
    const { data: session } = useSession();
    const router = useRouter();

    const getUserParticipantObject = (conversation: ConversationPopulated) => {
        // @ts-ignore
        return conversation.participants.find((p) => p.user.id === session.user.id) as ParticipantPopulated;
    };

    return (
        <Box width='100%'>
            <ConversationsModal />
            {conversations.map((conversation) => {
                const { hasSeenLatestMessage } = getUserParticipantObject(conversation);
                const isSelected = conversation.id === router.query.conversationId;

                return (
                    <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        hasSeenLatestMessage={hasSeenLatestMessage}
                        isSelected={isSelected}
                        onClick={() =>
                            onViewConversation(conversation.id/*, hasSeenLatestMessage*/)
                        }
                        // onEditConversation={() => onEditConversation(conversation)}
                        // onDeleteConversation={onDeleteConversation}
                        // onLeaveConversation={onLeaveConversation}
                    />
                );
            })}
        </Box>
    );
};
