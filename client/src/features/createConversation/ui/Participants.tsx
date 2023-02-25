import { Button } from '@chakra-ui/button';
import { Flex, Stack } from '@chakra-ui/react';
import { type FC } from 'react';
import type { SearchedUser } from '@/entities/user/model/types';
import { CloseIcon } from '@/shared/icons/CloseIcon';

type ParticipantsProps = {
  participants: Array<SearchedUser>;
  onRemove: (id: string) => void;
};

export const Participants: FC<ParticipantsProps> = ({
  participants,
  onRemove,
}) => {
  return (
    <Flex mt={8} gap="10px" flexWrap="wrap">
      {participants.map((participant) => (
        <Stack key={participant.id} direction="row">
          <Button
            aria-label="Remove item"
            rightIcon={<CloseIcon />}
            onClick={() => onRemove(participant.id)}
          >
            {participant.username}
          </Button>
        </Stack>
      ))}
    </Flex>
  );
};
