import { type FC, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ConversationsData } from '@/shared/types/conversationTypes';
import {
  CONVERSATION_CREATED,
  GET_CONVERSATIONS,
} from '@/entities/conversation';
import { CreateConversation } from '@/features/createConversation';
import { ConversationPopulated } from '../../../../../server/src/util/types';
import { ConversationsList } from '@/widgets/conversations/ui/ConversationsList';

export const ConversationsWidget: FC = () => {
  const { data, subscribeToMore } =
    useQuery<ConversationsData>(GET_CONVERSATIONS);

  useEffect(() => {
    const subscribeToNewConversations = () => {
      subscribeToMore({
        document: CONVERSATION_CREATED,
        updateQuery: (
          prev,
          {
            subscriptionData,
          }: {
            subscriptionData: {
              data: { conversationCreated: ConversationPopulated };
            };
          }
        ) => {
          if (!subscriptionData.data) return prev;

          return Object.assign({}, prev, {
            conversations: [
              subscriptionData.data.conversationCreated,
              ...prev.conversations,
            ],
          });
        },
      });
    };

    subscribeToNewConversations();
  }, [subscribeToMore]);

  const hasConversations = data && data?.conversations.length > 0;

  return (
    <>
      <CreateConversation />
      {hasConversations && (
        <ConversationsList conversations={data.conversations} />
      )}
    </>
  );
};
