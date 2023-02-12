import React, {type FC, useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {Flex, Stack} from "@chakra-ui/react";
import toast from "react-hot-toast";
import MessageOperations from "@/graphql/operations/message";
import {MessagesData, MessagesSubscriptionData, MessagesVariables,} from "@/util/types";
import {Skeletons} from "@/components/Skeletons";
import {MessageItem} from "./MessageItem";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

export const Messages: FC = () => {
    const conversationId = useRouter().query.conversationId as string;
    const { data: session } = useSession();
    const user = session!.user;

    const { data, loading, subscribeToMore } = useQuery<
        MessagesData,
        MessagesVariables
    >(MessageOperations.Query.messages, {
        variables: {
            conversationId,
        },
        onError: ({ message }) => {
            toast.error(message);
        },
    });

    useEffect(() => {
        return subscribeToMore({
            document: MessageOperations.Subscriptions.messageSent,
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
            {loading && (
                <Stack spacing={4} px={4}>
                    <Skeletons count={4} height="60px" width="100%" />
                </Stack>
            )}
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
