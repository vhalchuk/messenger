import {type FC, useEffect} from 'react';
import {ConversationsList} from "@/components/chat/conversations/ConversationsList";
import {Box} from "@chakra-ui/react";
import {useQuery} from "@apollo/client";
import ConversationOperations from '@/graphql/operations/conversation';
import {ConversationsData} from "@/util/types";
import {ConversationPopulated} from '../../../../../server/src/util/types';
import {Button} from "@chakra-ui/button";
import {ConversationsModal} from "@/components/chat/conversations/modal/ConversationsModal";
import {useCreateConversationModalContext} from "@/components/chat/conversations/modal/CreateConversationModalProvider";

export const ConversationsWrapper: FC = () => {
    const {
        data: conversationsData,
        error: conversationsError,
        loading: conversationsLoading,
        subscribeToMore,
    } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations)
    const { openModal } = useCreateConversationModalContext();

    useEffect(() => {
        const subscribeToNewConversations = () => {
            subscribeToMore({
                document: ConversationOperations.Subscriptions.conversationCreated,
                updateQuery: (prev, { subscriptionData }: { subscriptionData: { data: { conversationCreated: ConversationPopulated } } }) => {
                    if (!subscriptionData.data) return prev;


                    return Object.assign({}, prev, {
                        conversations: [subscriptionData.data.conversationCreated, ...prev.conversations]
                    })
                }
            })
        }

        subscribeToNewConversations();
    }, [subscribeToMore])

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
            <Button
                onClick={openModal}
                width="100%"
            >
                Find or start a conversation
            </Button>
            <ConversationsModal />

            {hasConversations && (
                <ConversationsList
                    conversations={conversationsData.conversations}
                />
            )}
        </Box>
    );
};
