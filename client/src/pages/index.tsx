import type {NextPage, NextPageContext} from 'next';
import {getSession, useSession} from 'next-auth/react'
import {Box} from "@chakra-ui/react";
import {Chat} from "@/components/chat/Chat";
import {Auth} from "@/components/auth/Auth";

const Home: NextPage = () => {
    const { data } = useSession();

    return (
        <Box>
            {data?.user.username ? <Chat /> : <Auth />}
        </Box>
    );
}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    return {
        props: {
            session
        }
    }
}

export default Home
