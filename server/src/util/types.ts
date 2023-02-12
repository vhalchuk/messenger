import {Session} from "next-auth";
import {Prisma, PrismaClient} from "@prisma/client";
import {conversationPopulated, participantPopulated} from "../graphql/resolvers/conversation";
import {Context} from 'graphql-ws/lib/server'
import {PubSub} from "graphql-subscriptions";

export type GraphQLContext = {
    session: null | Session;
    prisma: PrismaClient;
    pubsub: PubSub;
}

export type CreateUsernameResponse = {
    success?: boolean;
    error?: string;
}

export type ConversationPopulated = Prisma.ConversationGetPayload<{
    include: typeof conversationPopulated;
}>

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
    include: typeof participantPopulated;
}>;

export type SubscriptionContext = Context & {
    connectionParams: {
        session?: Session;
    }
}

export type ConversationCreatedSubscriptionPayload = {
    conversationCrated: ConversationPopulated;
}
