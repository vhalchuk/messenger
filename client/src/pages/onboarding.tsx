import { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { SignInButton } from '@/features/signIn';
import { CreateUsername } from '@/features/createUsername';
import { Center } from '@chakra-ui/react';

const Onboarding: NextPage = () => {
  const { data } = useSession();

  const isSignedIn = !!data?.user;
  const noUsername = isSignedIn && !data?.user.username;

  return (
    <Center height="100%">
      {!isSignedIn && <SignInButton />}
      {noUsername && <CreateUsername />}
    </Center>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session?.user?.username) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Onboarding;
