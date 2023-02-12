import {createContext, type FC, ReactNode, useContext, useState} from 'react';

type CreateConversationModalContextValue = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const CreateConversationModalContext = createContext<null | CreateConversationModalContextValue>(null);

export const CreateConversationModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen ,setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <CreateConversationModalContext.Provider value={{
            isOpen,
            openModal,
            closeModal
        }}>
            {children}
        </CreateConversationModalContext.Provider>
    );
};

export const useCreateConversationModalContext = (): CreateConversationModalContextValue => {
    const context = useContext(CreateConversationModalContext);

    if (context === null) {
        throw new Error('useCreateConversationModalContext hook must be used within CreateConversationModalProvider');
    }

    return context;
}
