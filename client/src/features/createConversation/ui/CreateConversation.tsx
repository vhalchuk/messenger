import { type FC, useState } from 'react';
import { CreateConversationButton } from './CreateConversationButton';
import { CreateConversationModal } from './CreateConversationModal';

export const CreateConversation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <CreateConversationButton onClick={openModal} />
      <CreateConversationModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};
