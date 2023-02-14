import React, {type FC, useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {Flex} from "@chakra-ui/react";
import toast from "react-hot-toast";
import {MessageItem} from "./MessageItem";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {MessagesData, MessagesSubscriptionData, MessagesVariables} from "@/shared/types/messageTypes";
import {GET_MESSAGES, MESSAGE_SENT} from "@/entities/message";

export const Messages: FC = () => {
    const conversationId = useRouter().query.conversationId as string;
    const { data: session } = useSession();
    const user = session!.user;

    const { data, subscribeToMore } = useQuery<
        MessagesData,
        MessagesVariables
    >(GET_MESSAGES, {
        variables: {
            conversationId,
        },
        onError: ({ message }) => {
            toast.error(message);
        },
    });

    useEffect(() => {
        return subscribeToMore({
            document: MESSAGE_SENT,
            variables: {
                conversationId,
            },
            updateQuery: (prev, { subscriptionData }: MessagesSubscriptionData) => {
                if (!subscriptionData.data) return prev;

                const newMessage = subscriptionData.data.messageSent;

                return Object.assign({}, prev, {
                    messages:
                        newMessage.sender.id === user.id
                            ? prev.messages
                            : [newMessage, ...prev.messages],
                });
            },
        });
    }, [conversationId, subscribeToMore, user.id]);

    return (
        <Flex direction="column" justify="flex-end" overflow="hidden">
            {data?.messages && (
                <Flex direction="column-reverse" overflowY="scroll" height="100%">
                    {data.messages.map((message) => (
                        <MessageItem
                            key={message.id}
                            message={message}
                            isAuthor={message.sender.id === user.id}
                        />
                    ))}
                </Flex>
            )}
        </Flex>
    );
};
