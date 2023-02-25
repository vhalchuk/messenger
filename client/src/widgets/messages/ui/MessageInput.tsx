import { Box, Input } from '@chakra-ui/react';
import { type FC } from 'react';
import { useMessageInput } from '../model/useMessageInput';

export const MessageInput: FC = () => {
  const { messageBody, setMessageBody, handleSend } = useMessageInput();

  return (
    <Box px={4} py={6} width="100%">
      <form onSubmit={handleSend}>
        <Input
          value={messageBody}
          onChange={(event) => setMessageBody(event.target.value)}
          size="md"
          placeholder="New message"
          color="whiteAlpha.900"
          resize="none"
          _focus={{
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'whiteAlpha.300',
          }}
          _hover={{
            borderColor: 'whiteAlpha.300',
          }}
        />
      </form>
    </Box>
  );
};
