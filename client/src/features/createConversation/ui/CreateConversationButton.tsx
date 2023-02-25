import { Button } from '@chakra-ui/button';
import { type FC } from 'react';

type CreateConversationButtonProps = {
  onClick: () => void;
};

export const CreateConversationButton: FC<CreateConversationButtonProps> = ({
  onClick,
}) => {
  return (
    <Button onClick={onClick} width="100%" mb={4}>
      Find or start a conversation
    </Button>
  );
};
