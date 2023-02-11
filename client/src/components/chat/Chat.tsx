import {type FC} from 'react';
import {Flex} from "@chakra-ui/react";
import {ConversationsWrapper} from "@/components/chat/conversations/ConversationsWrapper";
import {FeedWrapper} from "@/components/chat/feed/FeedWrapper";

export const Chat: FC = () => {
    return (
        <Flex height="100vh">
            <ConversationsWrapper />
            <FeedWrapper />
        </Flex>
    );
};
