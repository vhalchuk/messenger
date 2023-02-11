import {type FC} from 'react';
import {ConversationsList} from "@/components/chat/conversations/ConversationsList";
import {Box} from "@chakra-ui/react";

export const ConversationsWrapper: FC = () => {
    return (
        <Box
            width={{
                base: '100%',
                md: '400px'
            }}
            bg="whiteAlpha.50"
            py={6}
            px={3}
        >
            <ConversationsList />
        </Box>
    );
};
