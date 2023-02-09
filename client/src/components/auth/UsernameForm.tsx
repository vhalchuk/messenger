import {type FC, FormEventHandler, useState} from 'react';
import {Input} from "@chakra-ui/input";
import {Button, Stack, Text} from "@chakra-ui/react";

export const UsernameForm: FC = () => {
    const [username, setUsername] = useState('');

    const handleUsernameSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log('username', username)
    }

    return (
        <form onSubmit={handleUsernameSubmit}>
            <Stack spacing={6} align="center">
                <Text fontSize="3xl">Create username</Text>
                <Input
                    placeholder="Enter a username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    minLength={3}
                    maxLength={18}
                    type="text"
                    pattern="^\b\w+\b$"
                />
                <Button type="submit" width="100%">Save</Button>
            </Stack>
        </form>
    );
};
