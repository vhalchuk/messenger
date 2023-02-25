import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import { formatRelative } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { type FC } from 'react';
import { MessagePopulated } from '@server/util/types';

const formatRelativeLocale = {
  lastWeek: "eeee 'at' p",
  yesterday: "'Yesterday at' p",
  today: 'p',
  other: 'MM/dd/yy',
};

type MessageItemProps = {
  message: MessagePopulated;
  isAuthor: boolean;
};

export const MessageItem: FC<MessageItemProps> = ({ message, isAuthor }) => {
  return (
    <Stack
      direction="row"
      p={4}
      spacing={4}
      _hover={{ bg: 'whiteAlpha.200' }}
      justify={isAuthor ? 'flex-end' : 'flex-start'}
      wordBreak="break-word"
    >
      {!isAuthor && (
        <Flex align="flex-end">
          <Avatar size="sm" />
        </Flex>
      )}
      <Stack spacing={1} width="100%">
        <Stack
          direction="row"
          align="center"
          justify={isAuthor ? 'flex-end' : 'flex-start'}
        >
          {!isAuthor && (
            <Text fontWeight={500} textAlign={isAuthor ? 'right' : 'left'}>
              {message.sender.username}
            </Text>
          )}
          <Text fontSize={14} color="whiteAlpha.700">
            {formatRelative(new Date(+message.createdAt), new Date(), {
              locale: {
                ...enUS,
                formatRelative: (token) =>
                  formatRelativeLocale[
                    token as keyof typeof formatRelativeLocale
                  ],
              },
            })}
          </Text>
        </Stack>
        <Flex direction="row" justify={isAuthor ? 'flex-end' : 'flex-start'}>
          <Box
            bg={isAuthor ? 'brand.100' : 'whiteAlpha.300'}
            px={2}
            py={1}
            borderRadius={12}
            maxWidth="65%"
          >
            <Text>{message.body}</Text>
          </Box>
        </Flex>
      </Stack>
    </Stack>
  );
};
