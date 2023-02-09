import {type FC} from 'react';
import {Center} from "@chakra-ui/react";
import {useSession} from "next-auth/react";
import {UsernameForm} from "@/components/auth/UsernameForm";
import {SignInButton} from "@/components/auth/SignInButton";

export const Auth: FC = () => {
    const { data } = useSession();

    const isSignedIn = !!data?.user;
    const noUsername = isSignedIn && !data?.user.username;

    return (
        <Center height="100vh">
            {!isSignedIn && <SignInButton />}
            {noUsername && <UsernameForm />}
        </Center>
    );
};
