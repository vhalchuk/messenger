import {type FC, useState} from 'react';
import {Box} from "@chakra-ui/react";
import {ConversationsModal} from "@/components/chat/conversations/modal/ConversationsModal";
import {Button} from "@chakra-ui/button";

export const ConversationsList: FC = () => {
    const [isModalOpen ,setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <Box width='100%'>
            <Button
                onClick={openModal}
                width="100%"
            >
                Find or start a conversation
            </Button>
            <ConversationsModal
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </Box>
    );
};
