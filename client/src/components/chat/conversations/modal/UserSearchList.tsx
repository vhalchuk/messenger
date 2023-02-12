import {type FC} from 'react';
import {Avatar, Flex, Stack, Text} from "@chakra-ui/react";
import {Button} from "@chakra-ui/button";
import {SearchedUser} from "@/util/types";

type UserSearchListProps = {
    users: SearchedUser[];
    participants: SearchedUser[];
    onAddUser: (user: SearchedUser) => void;
    onRemoveUser: (id: string) => void;
}

export const UserSearchList: FC<UserSearchListProps> = (
    {
        users,
        participants,
        onAddUser,
        onRemoveUser,
    }
) => {
    if (users.length === 0) {
        return (
            <Flex mt={6} justify="center">
                <Text>No users found</Text>
            </Flex>
        )
    }

    return (
        <Stack mt={6}>
            {users.map((user) => {
                const isSelected = participants.some((p) => p.id === user.id);

                return (
                    <Stack
                        key={user.id}
                        direction="row"
                        align="center"
                        spacing={4}
                        py={2}
                        px={4}
                        borderRadius={4}
                        _hover={{ bg: "whiteAlpha.200" }}
                    >
                        <Avatar />
                        <Flex
                            width="100%"
                            justify="space-between"
                            align="center"
                        >
                            <Text>
                                {user.username}
                            </Text>
                            {isSelected ? (
                                <Button
                                    onClick={() => onRemoveUser(user.id)}
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                >
                                    Remove
                                </Button>
                                ) : (
                                <Button
                                    bg="brand.100"
                                    _hover={{ bg: "brand.200" }}
                                    onClick={() => onAddUser(user)}
                                >
                                    Select
                                </Button>
                            )}

                        </Flex>
                    </Stack>
                );
            })}
        </Stack>
    );
};
