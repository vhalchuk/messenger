import { useLazyQuery, useMutation } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { type FC, FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { CREATE_CONVERSATION } from '@/entities/conversation';
import { GET_USERS } from '@/entities/user';
import {
  CreateConversationData,
  CreateConversationInput,
} from '@/shared/types/conversationTypes';
import {
  SearchedUser,
  SearchUsersData,
  SearchUsersInput,
} from '@/shared/types/userTypes';
import { Participants } from './Participants';
import { UserSearchList } from './UserSearchList';

type CreateConversationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateConversationModal: FC<CreateConversationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [participants, setParticipants] = useState<SearchedUser[]>([]);

  const [searchUsers, { data, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(GET_USERS);
  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      CREATE_CONVERSATION
    );

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    searchUsers({ variables: { username } });
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
  };

  const removeParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreateConversation = async () => {
    const participantIds = participants.map(({ id }) => id);

    try {
      const { data } = await createConversation({
        variables: { participantIds },
      });

      if (!data?.createConversation) {
        toast.error('Failed to crete conversation');

        return;
      }

      const {
        createConversation: { conversationId },
      } = data;

      router.push({ query: { conversationId } });

      setParticipants([]);
      setUsername('');
      onClose();
    } catch (error: any) {
      if (error.message) {
        toast.error(error.message);
      }
    }
  };

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
                    _hover={{ bg: 'brand.200' }}
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
