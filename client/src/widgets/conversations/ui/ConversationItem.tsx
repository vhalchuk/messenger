import { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import { ConversationContextMenu } from './ConversationContextMenu';
import { GoPrimitiveDot } from 'react-icons/go';
import { formatUsernames } from '@/entities/conversation';
import { formatRelative } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { ConversationPopulated } from '../../../../../server/src/util/types';

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

  const handleClick = (event: React.MouseEvent) => {
    if (event.type === 'click') {
      onClick();
    } else if (event.type === 'contextmenu') {
      event.preventDefault();
      setMenuOpen(true);
    }
  };

  const showMenu =
    onEditConversation && onDeleteConversation && onLeaveConversation;

  const currentUser = session?.user!;

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={4}
      cursor="pointer"
      borderRadius={4}
      bg={isSelected ? 'whiteAlpha.200' : 'none'}
      _hover={{ bg: 'whiteAlpha.200' }}
      onClick={handleClick}
      onContextMenu={handleClick}
      position="relative"
    >
      {showMenu && (
        <ConversationContextMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          conversationId={conversation.id}
        />
      )}
      <Flex position="absolute" left="-6px">
        {hasSeenLatestMessage === false && (
          <GoPrimitiveDot fontSize={18} color="#6B46C1" />
        )}
      </Flex>
      <Avatar />
      <Flex justify="space-between" width="80%" height="100%">
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {formatUsernames(conversation.participants, currentUser.id)}
          </Text>
          {conversation.latestMessage && (
            <Box width="140%">
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {conversation.latestMessage.body}
              </Text>
            </Box>
          )}
        </Flex>
        <Text color="whiteAlpha.700" textAlign="right">
          {formatRelative(new Date(conversation.updatedAt), new Date(), {
            locale: {
              ...enUS,
              formatRelative: (token) =>
                formatRelativeLocale[
                  token as keyof typeof formatRelativeLocale
                ],
            },
          })}
        </Text>
      </Flex>
    </Stack>
  );
};
