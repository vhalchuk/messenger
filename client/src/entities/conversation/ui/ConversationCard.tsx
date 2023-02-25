import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import { type FC, MouseEventHandler, ReactNode } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';

type ConversationCardProps = {
  isSelected?: boolean;
  onClick: MouseEventHandler;
  onContextMenu: MouseEventHandler;
  hasSeenLatestMessage?: boolean;
  title: string;
  message?: string;
  date: string;
  contextMenu: ReactNode;
};

export const ConversationCard: FC<ConversationCardProps> = ({
  isSelected,
  onClick,
  onContextMenu,
  hasSeenLatestMessage,
  title,
  message,
  date,
  contextMenu,
}) => {
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
      onClick={onClick}
      onContextMenu={onContextMenu}
      position="relative"
    >
      {contextMenu}
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
            {title}
          </Text>
          {message && (
            <Box width="140%">
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {message}
              </Text>
            </Box>
          )}
        </Flex>
        <Text color="whiteAlpha.700" textAlign="right">
          {date}
        </Text>
      </Flex>
    </Stack>
  );
};
