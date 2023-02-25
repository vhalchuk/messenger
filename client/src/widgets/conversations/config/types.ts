import { ConversationPopulated } from '@server/util/types';

export type SubscriptionData = {
  data: { conversationCreated: ConversationPopulated };
};
