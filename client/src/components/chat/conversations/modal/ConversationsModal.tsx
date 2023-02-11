import {type FC, FormEventHandler, useState} from 'react';
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/modal";
import {Input, Stack} from "@chakra-ui/react";
import {Button} from "@chakra-ui/button";
import {useLazyQuery, useMutation} from "@apollo/client";
import UserOperations from '@/graphql/operations/user';
import {UserSearchList} from "@/components/chat/conversations/modal/UserSearchList";
import {Participants} from "@/components/chat/conversations/modal/Participants";
import ConversationOperations from '@/graphql/operations/conversation';
import toast from "react-hot-toast";
import {
    CreateConversationData,
    CreateConversationInput,
    SearchedUser,
    SearchUsersData,
    SearchUsersInput
} from "@/util/types";
import {useRouter} from "next/router";

type ConversationsModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const ConversationsModal: FC<ConversationsModalProps> = (
    {
        isOpen,
        onClose
    }
) => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [participants, setParticipants] = useState<SearchedUser[]>([]);

    const [searchUsers, { data, loading }] = useLazyQuery<
        SearchUsersData,
        SearchUsersInput
    >(UserOperations.Queries.searchUsers);
    const [createConversation, { loading: createConversationLoading }] = useMutation<CreateConversationData, CreateConversationInput>(
        ConversationOperations.Mutations.createConversation
    );

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault();

        console.log('username', username)
        searchUsers({ variables: { username } });
    }

    const addParticipant = (user: SearchedUser) => {
        setParticipants((prev) => [...prev, user]);
    };

    const removeParticipant = (id: string) => {
        setParticipants((prev) => prev.filter((p) => p.id !== id));
    }

    const handleCreateConversation = async () => {
        const participantIds = participants.map(({ id }) => id);

        try {
            const { data } = await createConversation({
                variables: { participantIds }
            });

            if (!data?.createConversation) {
                toast.error('Failed to crete conversation');

                return;
            }

            const { createConversation: { conversationId } } = data;

            router.push({ query: { conversationId } });

            setParticipants([]);
            setUsername('');
            onClose();
        } catch (error: any) {
            if (error.message) {
                toast.error(error.message);
            }
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#2d2d2d" pb={4}>
                <ModalHeader>Create a conversation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <Input
                                placeholder="Enter a username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                disabled={loading}
                            />
                            <Button type="submit" disabled={!username} isLoading={loading}>
                                Search
                            </Button>
                            {data?.searchUsers && (
                                <UserSearchList
                                    users={data.searchUsers}
                                    participants={participants}
                                    onAddUser={addParticipant}
                                    onRemoveUser={removeParticipant}
                                />
                            )}
                            {participants.length > 0 && (
                                <>
                                    <Participants
                                        participants={participants}
                                        onRemove={removeParticipant}
                                    />
                                    <Button
                                        bg="brand.100"
                                        width="100%"
                                        mt={6}
                                        _hover={{ bg: 'brand.100' }}
                                        onClick={handleCreateConversation}
                                        isLoading={createConversationLoading}
                                    >
                                        Create Conversation
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
