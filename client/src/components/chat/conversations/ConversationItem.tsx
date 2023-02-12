import {type FC} from 'react';
import { ConversationPopulated } from '../../../../../server/src/util/types';
import {Stack, Text} from "@chakra-ui/react";


type ConversationItemProps = {
    conversation: ConversationPopulated;
}

export const ConversationItem: FC<ConversationItemProps> = (
    {
        conversation
    }
) => {
    return (
        <Stack p={4} _hover={{ _bg: 'whiteAlpha.200' }}>
            <Text>
                {conversation.id}
            </Text>
        </Stack>
    );
};
