import {type FC} from 'react';
import {Flex} from "@chakra-ui/react";
import {ConversationsWrapper} from "@/components/chat/conversations/ConversationsWrapper";
import {FeedWrapper} from "@/components/chat/feed/FeedWrapper";
import {CreateConversationModalProvider} from "@/components/chat/conversations/modal/CreateConversationModalProvider";

export const Chat: FC = () => {
    return (
        <CreateConversationModalProvider>
            <Flex height="100vh">
                <ConversationsWrapper />
                <FeedWrapper />
            </Flex>
        </CreateConversationModalProvider>
    );
};
