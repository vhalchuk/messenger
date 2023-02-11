import {GraphQLContext} from "../../util/types";
import {GraphQLError} from "graphql/error";
import {Prisma} from "@prisma/client";

const resolvers = {
    Query: {},
    Mutation: {
        createConversation: async (
            _,
            args: { participantIds: string[] },
            context: GraphQLContext
        ): Promise<{ conversationId: string }> => {
            const { participantIds } = args;
            const { session, prisma } = context;

            if (!session?.user) {
                throw new GraphQLError('Not authorized');
            }

            const allParticipantIds = [...participantIds, session.user.id];

            const conversation = await prisma.conversation.create({
                data: {
                    participants: {
                        createMany: {
                            data: allParticipantIds.map((id) => ({
                                userId: id,
                                hasSeenLatestMessage: id === session.user.id,
                            })),
                        },
                    },
                },
                include: conversationPopulated,
            });

            return {
                conversationId: conversation.id
            }
        }
    },
}

export const participantPopulated = Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
        select: {
            id: true,
            username: true,
        }
    }
});

export const conversationPopulated = Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
        include: participantPopulated
    },
    latestMessage: {
        include: {
            sender: {
                select: {
                    id: true,
                    username: true,
                }
            }
        }
    }
})

export default resolvers;
