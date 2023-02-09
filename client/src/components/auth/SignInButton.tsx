import {type FC} from 'react';
import {signIn} from "next-auth/react";
import {GoogleLogo} from "@/components/auth/GoogleLogo";
import {Button} from "@chakra-ui/react";

export const SignInButton: FC = () => {
    return (
        <Button onClick={() => signIn('google')} leftIcon={<GoogleLogo />}>
            Continue with Google
        </Button>
    );
};
