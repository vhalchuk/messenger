import {type FC, useState} from 'react';
import {CreateConversationButton} from "@/features/createConversation/ui/CreateConversationButton";
import {CreateConversationModal} from "@/features/createConversation/ui/CreateConversationModal";

export const CreateConversation: FC = () => {
    const [isOpen ,setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <>
            <CreateConversationButton onClick={openModal} />
            <CreateConversationModal
                isOpen={isOpen}
                onClose={closeModal}
            />
        </>
    );
};
