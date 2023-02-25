import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { SearchedUser } from '@/shared/types/userTypes';
import { useCreateConversationMutation } from '../lib/useCreateConversationMutation';
import { useUsersLazyQuery } from '../lib/useUsersLazyQuery';

export const useCreateConversationForm = (onSuccess: () => void) => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [participants, setParticipants] = useState<SearchedUser[]>([]);

  const [searchUsers, { data, loading: loadingUsers }] = useUsersLazyQuery();
  const users = data?.searchUsers ?? [];

  const [createConversation, { loading: createConversationLoading }] =
    useCreateConversationMutation();

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
      onSuccess();
    } catch (error: any) {
      if (error.message) {
        toast.error(error.message);
      }
    }
  };

  return {
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
  };
};
