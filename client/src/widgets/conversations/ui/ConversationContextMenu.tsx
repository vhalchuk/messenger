import { Menu, MenuItem, MenuList } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FC, MouseEventHandler } from 'react';
import toast from 'react-hot-toast';
import { BiLogOut } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import { ConversationPopulated } from '@server/util/types';
import { useDeleteConversationAndUpdateCache } from '@/features/deleteConversation';
import { useLeaveConversationAndUpdateCache } from '@/features/leaveConversation';

type ConversationContextMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  conversation: ConversationPopulated;
};

export const ConversationContextMenu: FC<ConversationContextMenuProps> = ({
  isOpen,
  onClose,
  conversation,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const leaveConversation = useLeaveConversationAndUpdateCache();
  const deleteConversation = useDeleteConversationAndUpdateCache();

  const handleLeaveConversation: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();

    if (router.query.conversationId === conversation.id) {
      router.replace('');
    }

    toast.promise(leaveConversation(conversation, session!.user.id!), {
      loading: 'Leaving conversation',
      success: 'Conversation left',
      error: 'Failed to leave conversation',
    });
  };

  const handleDeleteConversation: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();

    if (router.query.conversationId === conversation.id) {
      router.replace('');
    }

    toast.promise(deleteConversation(conversation.id), {
      loading: 'Deleting conversation',
      success: 'Conversation deleted',
      error: 'Failed to delete conversation',
    });
  };

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuList bg="#2d2d2d">
        {conversation.participants.length > 2 ? (
          <MenuItem
            icon={<BiLogOut fontSize={20} />}
            onClick={handleLeaveConversation}
          >
            Leave
          </MenuItem>
        ) : (
          <MenuItem
            icon={<MdDeleteOutline fontSize={20} />}
            onClick={handleDeleteConversation}
          >
            Delete
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
