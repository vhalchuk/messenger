import { Button } from '@chakra-ui/button';
import { Flex, Input, Stack, Text } from '@chakra-ui/react';
import { type FC } from 'react';
import { useCreateConversationForm } from '../model/useCreateConversationForm';
import { Participants } from './Participants';
import { UserSearchList } from './UserSearchList';

type CreateConversationFormProps = {
  onSuccess: () => void;
};

export const CreateConversationForm: FC<CreateConversationFormProps> = ({
  onSuccess,
}) => {
  const {
    handleSubmit,
    username,
    setUsername,
    loadingUsers,
    users,
    participants,
    addParticipant,
    removeParticipant,
    handleCreateConversation,
    createConversationLoading,
  } = useCreateConversationForm(onSuccess);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Input
          placeholder="Enter a username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          disabled={loadingUsers}
        />
        <Button type="submit" disabled={!username} isLoading={loadingUsers}>
          Search
        </Button>
        {users.length === 0 && (
          <Flex mt={6} justify="center">
            <Text>No users found</Text>
          </Flex>
        )}
        {users?.length > 0 && (
          <UserSearchList
            users={users}
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
  );
};
