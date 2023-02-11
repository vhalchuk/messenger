import {type FC} from 'react';
import {Flex, Stack} from "@chakra-ui/react";
import {CloseIcon} from "@/components/chat/conversations/modal/CloseIcon";
import {Button} from "@chakra-ui/button";
import {SearchedUser} from "@/util/types";

type ParticipantsProps = {
    participants: Array<SearchedUser>;
    onRemove: (id: string) => void;
}

export const Participants: FC<ParticipantsProps> = (
    {
        participants,
        onRemove
    }
) => {
    return (
        <Flex mt={8} gap="10px" flexWrap="wrap">
            {participants.map((participant) => (
                <Stack key={participant.id} direction='row'>
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
