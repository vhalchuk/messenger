import type { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { ConversationsWidget } from '@/widgets/conversations/ui/ConversationsWidget';
import { MessagesWidget } from '@/widgets/messages/ui/MessagesWidget';
import { ColumnsLayout } from '@/shared/layout';

const Home: NextPage = () => {
  return (
    <ColumnsLayout>
      <ColumnsLayout.LeftColumn>
        <ConversationsWidget />
      </ColumnsLayout.LeftColumn>
      <ColumnsLayout.RightColumn>
        <MessagesWidget />
      </ColumnsLayout.RightColumn>
    </ColumnsLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session?.user?.username) {
    return {
      redirect: {
        destination: '/onboarding',
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

export default Home;
