import {type FC} from 'react';
import {Menu, MenuItem, MenuList} from "@chakra-ui/react";
import {AiOutlineEdit} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";

type ConversationContextMenuProps = {
    isOpen: boolean;
    onClose: () => void;
    conversationId: string;
    onEditConversation?: () => void;
    onLeaveConversation?: (conversationId: string) => void;
    onDeleteConversation?: (conversationId: string) => void;
}

export const ConversationContextMenu: FC<ConversationContextMenuProps> = (
    {
        isOpen,
        onClose,
        conversationId,
        onEditConversation,
        onLeaveConversation,
        onDeleteConversation,
    }
) => {
    return (
        <Menu isOpen={isOpen} onClose={onClose}>
            <MenuList bg="#2d2d2d">
                {onEditConversation && (
                    <MenuItem
                        icon={<AiOutlineEdit fontSize={20} />}
                        onClick={(event) => {
                            event.stopPropagation();
                            onEditConversation();
                        }}
                    >
                        Edit
                    </MenuItem>
                )}
                {onLeaveConversation && (
                    <MenuItem
                        icon={<BiLogOut fontSize={20} />}
                        onClick={(event) => {
                            event.stopPropagation();
                            onLeaveConversation(conversationId);
                        }}
                    >
                        Leave
                    </MenuItem>
                )}
                {onDeleteConversation && (
                    <MenuItem
                        icon={<MdDeleteOutline fontSize={20} />}
                        onClick={(event) => {
                            event.stopPropagation();
                            onDeleteConversation(conversationId);
                        }}
                    >
                        Delete
                    </MenuItem>
                )}
            </MenuList>
        </Menu>
    );
};
