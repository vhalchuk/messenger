import {type FC, useEffect} from 'react';
import {ConversationsList} from "@/components/chat/conversations/ConversationsList";
import {Box} from "@chakra-ui/react";
import {useQuery} from "@apollo/client";
import {ConversationPopulated} from '../../../../../server/src/util/types';
import {Button} from "@chakra-ui/button";
import {ConversationsModal} from "@/components/chat/conversations/modal/ConversationsModal";
import {useCreateConversationModalContext} from "@/components/chat/conversations/modal/CreateConversationModalProvider";
import {useRouter} from "next/router";
import {ConversationsData} from "@/shared/types/conversationTypes";
import {CONVERSATION_CREATED, GET_CONVERSATIONS} from "@/entities/conversation";

export const ConversationsWrapper: FC = () => {
    const router = useRouter();
    const {
        data: conversationsData,
        subscribeToMore,
    } = useQuery<ConversationsData>(GET_CONVERSATIONS)
    const { openModal } = useCreateConversationModalContext();

    useEffect(() => {
        const subscribeToNewConversations = () => {
            subscribeToMore({
                document: CONVERSATION_CREATED,
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

    const viewConversation = async (conversationId: string) => {
        router.push({ query: { conversationId }});

    }

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
            display={{ base: router.query.conversationId ? 'none' : 'block', md: 'block' }}
            flexShrink={0}
        >
            <Button
                onClick={openModal}
                width="100%"
                mb={4}
            >
                Find or start a conversation
            </Button>
            <ConversationsModal />
            {hasConversations && (
                <ConversationsList
                    conversations={conversationsData.conversations}
                    onViewConversation={viewConversation}
                />
            )}
        </Box>
    );
};
