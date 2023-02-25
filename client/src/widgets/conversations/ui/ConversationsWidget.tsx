import { type FC } from 'react';
import { CreateConversation } from '@/features/createConversation';
import { useConversations } from '../lib/useConversations';
import { ConversationsList } from './ConversationsList';

export const ConversationsWidget: FC = () => {
  const conversations = useConversations();

  return (
    <>
      <CreateConversation />
      {conversations.length > 0 && (
        <ConversationsList conversations={conversations} />
      )}
    </>
  );
};
