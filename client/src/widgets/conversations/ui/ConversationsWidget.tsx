import { type FC } from 'react';
import { useConversations } from '@/widgets/conversations/lib/useConversations';
import { ConversationsList } from '@/widgets/conversations/ui/ConversationsList';
import { CreateConversation } from '@/features/createConversation';

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
