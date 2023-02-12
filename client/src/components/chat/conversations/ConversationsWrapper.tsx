import {type FC} from 'react';
import {ConversationsList} from "@/components/chat/conversations/ConversationsList";
import {Box} from "@chakra-ui/react";
import {useQuery} from "@apollo/client";
import ConversationOperations from '@/graphql/operations/conversation';
import {ConversationsData} from "@/util/types";

export const ConversationsWrapper: FC = () => {
    const {
        data: conversationsData,
        error: conversationsError,
        loading: conversationsLoading,
    } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations)


    const hasConversations = conversationsData && conversationsData?.conversations.length > 0;

    return (
        <Box
            width={{
                base: '100%',
                md: '400px'
            }}
            bg="whiteAlpha.50"
            py={6}
            px={3}
        >
            {hasConversations && (
                <ConversationsList
                    conversations={conversationsData.conversations}
                />
            )}
        </Box>
    );
};
