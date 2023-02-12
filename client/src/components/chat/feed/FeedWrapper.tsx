import {type FC} from 'react';
import {useRouter} from "next/router";
import {Flex} from "@chakra-ui/react";
import {MessagesHeader} from "@/components/chat/feed/messages/MessagesHeader";
import {MessageInput} from "@/components/chat/feed/messages/MessageInput";

export const FeedWrapper: FC = () => {
    const router = useRouter();
    const { conversationId } = router.query;

    return (
        <Flex
            display={{ base: conversationId ? "flex" : "none", md: "flex" }}
            direction="column"
            width="100%"
        >
            {conversationId && typeof conversationId === "string" ? (
                <>
                    <Flex
                        direction="column"
                        justify="space-between"
                        overflow="hidden"
                        flexGrow={1}
                    >
                        <MessagesHeader />
                    </Flex>
                    <MessageInput />
                </>
            ) : (
                'NoConversationSelected'
            )}
        </Flex>
    );
};
