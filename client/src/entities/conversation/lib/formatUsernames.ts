import { ParticipantPopulated } from '@server/util/types';

export const formatUsernames = (
  participants: Array<ParticipantPopulated>,
  currentUserId: string
): string => {
  const usernames = participants
    .filter((participant) => participant.user.id != currentUserId)
    .map((participant) => participant.user.username);

  return usernames.join(', ');
};
