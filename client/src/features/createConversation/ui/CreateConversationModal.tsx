import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { type FC } from 'react';
import { CreateConversationForm } from './CreateConversationForm';

type CreateConversationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateConversationModal: FC<CreateConversationModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#2d2d2d" pb={4}>
        <ModalHeader>Create a conversation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateConversationForm onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
