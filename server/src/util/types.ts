import {Session} from "next-auth";
import {Prisma, PrismaClient} from "@prisma/client";
import {conversationPopulated, participantPopulated} from "../graphql/resolvers/conversation";

export type GraphQLContext = {
    session: null | Session;
    prisma: PrismaClient;
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
