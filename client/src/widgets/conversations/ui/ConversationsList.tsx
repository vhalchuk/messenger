import { type FC } from 'react';
import {
  ConversationPopulated,
  ParticipantPopulated,
} from '../../../../../server/src/util/types';
import { Box } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ConversationItem } from './ConversationItem';

type ConversationsListProps = {
  conversations: ConversationPopulated[];
};

export const ConversationsList: FC<ConversationsListProps> = ({
  conversations,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const viewConversation = async (conversationId: string) => {
    router.push({ query: { conversationId } });
  };

  return (
    <Box width="100%">
      {conversations.map((conversation) => {
        const { hasSeenLatestMessage } = conversation.participants.find(
          (p) => p.user.id === session!.user.id
        ) as ParticipantPopulated;
        const isSelected = conversation.id === router.query.conversationId;
        const handleClick = () => viewConversation(conversation.id);

        return (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            hasSeenLatestMessage={hasSeenLatestMessage}
            isSelected={isSelected}
            onClick={handleClick}
          />
        );
      })}
    </Box>
  );
};
