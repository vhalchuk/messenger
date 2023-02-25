import { formatRelative } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useSession } from 'next-auth/react';
import { FC, MouseEventHandler, useState } from 'react';
import { ConversationPopulated } from '@server/util/types';
import { ConversationCard, formatUsernames } from '@/entities/conversation';
import { ConversationContextMenu } from './ConversationContextMenu';

const formatRelativeLocale = {
  lastWeek: 'eeee',
  yesterday: "'Yesterday",
  today: 'p',
  other: 'MM/dd/yy',
};

type ConversationItemProps = {
  conversation: ConversationPopulated;
  onClick: () => void;
  hasSeenLatestMessage?: boolean;
  isSelected?: boolean;
  onEditConversation?: () => void;
  onDeleteConversation?: (conversationId: string) => void;
  onLeaveConversation?: (conversation: ConversationPopulated) => void;
};

export const ConversationItem: FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  hasSeenLatestMessage,
  onClick,
  onEditConversation,
  onDeleteConversation,
  onLeaveConversation,
}) => {
  const { data: session } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleContextMenu: MouseEventHandler = (event) => {
    event.preventDefault();
  };

  const showMenu =
    onEditConversation && onDeleteConversation && onLeaveConversation;

  const currentUser = session?.user!;

  return (
    <ConversationCard
      isSelected={isSelected}
      onClick={onClick}
      onContextMenu={handleContextMenu}
      hasSeenLatestMessage={hasSeenLatestMessage}
      title={formatUsernames(conversation.participants, currentUser.id)}
      message={conversation.latestMessage?.body}
      date={formatRelative(new Date(conversation.updatedAt), new Date(), {
        locale: {
          ...enUS,
          formatRelative: (token) =>
            formatRelativeLocale[token as keyof typeof formatRelativeLocale],
        },
      })}
      contextMenu={
        showMenu && (
          <ConversationContextMenu
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            conversationId={conversation.id}
          />
        )
      }
    />
  );
};
