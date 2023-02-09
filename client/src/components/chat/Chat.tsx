import {type FC} from 'react';
import {Button} from "@chakra-ui/react";
import {signOut} from "next-auth/react";

type ChatProps = {

}

export const Chat: FC<ChatProps> = () => {
    return (
        <div>
            <Button onClick={() => signOut()}>Logout</Button>
        </div>
    );
};
