import {type FC} from 'react';
import {Flex, Stack, Text} from "@chakra-ui/react";
import { BiMessageSquareDots } from "react-icons/bi";
import {Button} from "@chakra-ui/button";
import {useQuery} from "@apollo/client";
import {useCreateConversationModalContext} from "@/components/chat/conversations/modal/CreateConversationModalProvider";
import {ConversationsData} from "@/util/types";
import ConversationOperations from '@/graphql/operations/conversation';

export const NoConversationSelected: FC = () => {
    const { data, loading, error } = useQuery<ConversationsData>(
        ConversationOperations.Queries.conversations
    );
    const { openModal } = useCreateConversationModalContext();

    if (!data?.conversations || loading || error) return null;

    const { conversations } = data;

    const hasConversations = conversations.length;

    const text = hasConversations
        ? "Select a Conversation"
        : "Let's Get Started 🥳";

    return (
        <Flex height="100%" justify="center" align="center">
            <Stack spacing={10} align="center">
                <Text fontSize={40}>{text}</Text>
                {hasConversations ? (
                    <BiMessageSquareDots fontSize={90} />
                ) : (
                    <Button bg="brand.100" _hover={{ bg: 'brand.200' }} onClick={openModal}>
                        Create Conversation
                    </Button>
                )}
            </Stack>
        </Flex>
    );
};
