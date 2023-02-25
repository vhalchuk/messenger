import {type Session} from "next-auth";
import {Prisma, PrismaClient} from "@prisma/client";
import {conversationPopulated, participantPopulated} from "../graphql/resolvers/conversation";
import {Context} from 'graphql-ws/lib/server'
import {PubSub} from "graphql-subscriptions";
import { messagePopulated } from "../graphql/resolvers/message";

export type GraphQLContext = {
    session: null | Session;
    prisma: PrismaClient;
    pubsub: PubSub;
}

export type SubscriptionContext = Context & {
    connectionParams: {
        session?: Session;
    }
}

/**
 * Users
 */
export type User = {
    id: string;
    username: string;
}

export type CreateUsernameResponse = {
    success?: boolean;
    error?: string;
}

export type SearchUsersResponse = {
    users: Array<User>;
}

/**
 * Conversations
 */
export type ConversationPopulated = Prisma.ConversationGetPayload<{
    include: typeof conversationPopulated;
}>

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
    include: typeof participantPopulated;
}>;

export type ConversationCreatedSubscriptionPayload = {
    conversationCreated: ConversationPopulated;
}

export type ConversationUpdatedSubscriptionData = {
    conversationUpdated: {
        conversation: ConversationPopulated;
        addedUserIds: Array<string>;
        removedUserIds: Array<string>;
    };
}

export type ConversationDeletedSubscriptionPayload = {
    conversationDeleted: ConversationPopulated;
}

/**
 * Messages
 */
export interface SendMessageArguments {
    id: string;
    conversationId: string;
    senderId: string;
    body: string;
}

export interface SendMessageSubscriptionPayload {
    messageSent: MessagePopulated;
}

export type MessagePopulated = Prisma.MessageGetPayload<{
    include: typeof messagePopulated;
}>;
