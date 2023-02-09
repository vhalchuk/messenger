import {Session} from "next-auth";
import {PrismaClient} from "@prisma/client";

export type GraphQLContext = {
    session: null | Session;
    prisma: PrismaClient;
}

export type CreateUsernameResponse = {
    success?: boolean;
    error?: string;
}
