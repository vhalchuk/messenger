import {type FC, useState} from 'react';
import { useMutation } from "@apollo/client";
import { Box, Input } from "@chakra-ui/react";
import { ObjectID } from "bson";
import toast from "react-hot-toast";
import MessageOperations from "@/graphql/operations/message";
import { MessagesData, SendMessageVariables } from "@/util/types";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

export const MessageInput: FC = () => {
    const conversationId = useRouter().query.conversationId as string;
    const { data: session } = useSession();
    const user = session!.user;

    const [messageBody, setMessageBody] = useState("");

    const [sendMessage] = useMutation<
        { sendMessage: boolean },
        SendMessageVariables
    >(MessageOperations.Mutations.sendMessage);

    const onSendMessage = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const { id: senderId } = user;
            const newId = new ObjectID().toString();
            const newMessage: SendMessageVariables = {
                id: newId,
                senderId,
                conversationId,
                body: messageBody,
            };
            const { data, errors } = await sendMessage({
                variables: {
                    ...newMessage,
                },
                optimisticResponse: {
                    sendMessage: true,
                },
                update: (cache) => {
                    setMessageBody("");
                    const existing = cache.readQuery<MessagesData>({
                        query: MessageOperations.Query.messages,
                        variables: { conversationId },
                    }) as MessagesData;

                    cache.writeQuery<MessagesData, { conversationId: string }>({
                        query: MessageOperations.Query.messages,
                        variables: { conversationId },
                        data: {
                            ...existing,
                            messages: [
                                {
                                    id: newId,
                                    body: messageBody,
                                    senderId: user.id,
                                    conversationId,
                                    sender: {
                                        id: user.id,
                                        username: user.username,
                                    },
                                    createdAt: new Date(Date.now()),
                                    updatedAt: new Date(Date.now()),
                                },
                                ...existing.messages,
                            ],
                        },
                    });
                },
            });

            if (!data?.sendMessage || errors) {
                toast.error("Error sending message");
            }
        } catch (error: any) {
            console.log("onSendMessage error", error);
            toast.error(error?.message);
        }
    };

    return (
        <Box px={4} py={6} width="100%">
            <form onSubmit={onSendMessage}>
                <Input
                    value={messageBody}
                    onChange={(event) => setMessageBody(event.target.value)}
                    size="md"
                    placeholder="New message"
                    color="whiteAlpha.900"
                    resize="none"
                    _focus={{
                        boxShadow: "none",
                        border: "1px solid",
                        borderColor: "whiteAlpha.300",
                    }}
                    _hover={{
                        borderColor: "whiteAlpha.300",
                    }}
                />
            </form>
        </Box>
    );
};
