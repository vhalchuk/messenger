import {type FC, FormEventHandler, useState} from 'react';
import {Input} from "@chakra-ui/input";
import {Stack, Text} from "@chakra-ui/react";
import {Button} from '@chakra-ui/button';
import {useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import {CreateUsernameData, CreateUsernameVariables} from "@/shared/types/userTypes";
import {CREATE_USERNAME} from "@/entities/user";

export const UsernameForm: FC = () => {
    const [username, setUsername] = useState('');
    const [createUsername, { loading }] = useMutation<CreateUsernameData, CreateUsernameVariables>(CREATE_USERNAME);

    // workaround to make session get reloaded
    const reloadSession = () => {
        const event = new Event('visibilitychange');
        document.dispatchEvent(event);
    }

    const handleUsernameSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await createUsername({ variables: { username } });

            if (!data?.createUsername) {
                toast.error('Something went wrong...');
                return;
            }

            if (data.createUsername.error) {
                toast.error('data.createUsername.error');
                return;
            }

            reloadSession();
            toast.success('Username successfully created');
        } catch (error: unknown) {
            if (error?.hasOwnProperty('message')) {
                toast.error((error as { message: string }).message);
            }
        }
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
                <Button
                    type="submit"
                    width="100%"
                    isLoading={loading}
                    disabled
                >
                    Save
                </Button>
            </Stack>
        </form>
    );
};
