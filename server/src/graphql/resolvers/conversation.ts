import {
    ConversationCreatedSubscriptionPayload, ConversationDeletedSubscriptionPayload,
    ConversationPopulated,
    ConversationUpdatedSubscriptionData,
    GraphQLContext,
} from '../../util/types';
import {GraphQLError} from "graphql/error";
import {Prisma} from "@prisma/client";
import {withFilter} from "graphql-subscriptions";
import { userIsConversationParticipant } from '../../util/functions';

const resolvers = {
    Query: {
        conversations: async (
            _,
            __,
            context: GraphQLContext
        ): Promise<ConversationPopulated[]> => {
            const { session, prisma } = context;

            if (!session?.user) {
                throw new GraphQLError('Not authorized');
            }

            try {
                const conversations = await prisma.conversation.findMany({
                    include: conversationPopulated
                });

                // prisma issue does not let to filter it properly, so it has to be done this way
                return conversations.filter((conversation) =>
                    conversation.participants.find((p) => p.userId === session.user.id));
            } catch (error: any) {
                throw new GraphQLError(error?.messsage);
            }
        }
    },
    Mutation: {
        createConversation: async (
            _,
            args: { participantIds: string[] },
            context: GraphQLContext
        ): Promise<{ conversationId: string }> => {
            const { participantIds } = args;
            const { session, prisma, pubsub } = context;

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

            await pubsub.publish('CONVERSATION_CREATED', {
                conversationCreated: conversation
            })

            return {
                conversationId: conversation.id
            }
        },
        markConversationAsRead: async function (
          _: any,
          args: { userId: string; conversationId: string },
          context: GraphQLContext
        ): Promise<boolean> {
            const { userId, conversationId } = args;
            const { session, prisma } = context;

            if (!session?.user) {
                throw new GraphQLError("Not authorized");
            }

            try {
                await prisma.conversationParticipant.updateMany({
                    where: {
                        userId,
                        conversationId,
                    },
                    data: {
                        hasSeenLatestMessage: true,
                    },
                });

                return true;
            } catch (error: any) {
                console.log("markConversationAsRead error", error);
                throw new GraphQLError(error.message);
            }
        },
        deleteConversation: async function (
          _: any,
          args: { conversationId: string },
          context: GraphQLContext
        ): Promise<boolean> {
            const { session, prisma, pubsub } = context;
            const { conversationId } = args;

            if (!session?.user) {
                throw new GraphQLError("Not authorized");
            }

            try {
                /**
                 * Delete conversation and all related entities
                 */
                const [deletedConversation] = await prisma.$transaction([
                    prisma.conversation.delete({
                        where: {
                            id: conversationId,
                        },
                        include: conversationPopulated,
                    }),
                    prisma.conversationParticipant.deleteMany({
                        where: {
                            conversationId,
                        },
                    }),
                    prisma.message.deleteMany({
                        where: {
                            conversationId,
                        },
                    }),
                ]);

                pubsub.publish("CONVERSATION_DELETED", {
                    conversationDeleted: deletedConversation,
                });

                return true;
            } catch (error: any) {
                console.log("deleteConversation error", error);
                throw new GraphQLError(error?.message);
            }
        },
        updateParticipants: async function (
          _: any,
          args: { conversationId: string; participantIds: Array<string> },
          context: GraphQLContext
        ): Promise<boolean> {
            const { session, prisma, pubsub } = context;
            const { conversationId, participantIds } = args;

            if (!session?.user) {
                throw new GraphQLError("Not authorized");
            }

            try {
                const participants = await prisma.conversationParticipant.findMany({
                    where: {
                        conversationId,
                    },
                });

                const existingParticipants = participants.map((p) => p.userId);

                const participantsToDelete = existingParticipants.filter(
                  (id) => !participantIds.includes(id)
                );

                const participantsToCreate = participantIds.filter(
                  (id) => !existingParticipants.includes(id)
                );

                const transactionStatements = [
                    prisma.conversation.update({
                        where: {
                            id: conversationId,
                        },
                        data: {
                            participants: {
                                deleteMany: {
                                    userId: {
                                        in: participantsToDelete,
                                    },
                                    conversationId,
                                },
                            },
                        },
                        include: conversationPopulated,
                    }),
                ];

                if (participantsToCreate.length) {
                    transactionStatements.push(
                      prisma.conversation.update({
                          where: {
                              id: conversationId,
                          },
                          data: {
                              participants: {
                                  createMany: {
                                      data: participantsToCreate.map((id) => ({
                                          userId: id,
                                          hasSeenLatestMessage: true,
                                      })),
                                  },
                              },
                          },
                          include: conversationPopulated,
                      })
                    );
                }

                const [deleteUpdate, addUpdate] = await prisma.$transaction(
                  transactionStatements
                );

                pubsub.publish("CONVERSATION_UPDATED", {
                    conversationUpdated: {
                        conversation: addUpdate || deleteUpdate,
                        addedUserIds: participantsToCreate,
                        removedUserIds: participantsToDelete,
                    },
                });

                return true;
            } catch (error: any) {
                console.log("updateParticipants error", error);
                throw new GraphQLError(error?.message);
            }
        },
    },
    Subscription: {
        conversationCreated: {
            subscribe: withFilter(
                (_, __, context: GraphQLContext) => {
                    const { pubsub } = context;

                    return pubsub.asyncIterator(['CONVERSATION_CREATED']);
                },
                (payload: ConversationCreatedSubscriptionPayload, _, context: GraphQLContext) => {
                    const { participants } = payload.conversationCreated;
                    const { session } = context;

                    return participants.some((p) => p.userId === session?.user.id);
                }
            ),
        },
        conversationUpdated: {
            subscribe: withFilter(
              (_: any, __: any, context: GraphQLContext) => {
                  const { pubsub } = context;

                  return pubsub.asyncIterator(["CONVERSATION_UPDATED"]);
              },
              (
                payload: ConversationUpdatedSubscriptionData,
                _,
                context: GraphQLContext
              ) => {
                  const { session } = context;

                  if (!session?.user) {
                      throw new GraphQLError("Not authorized");
                  }

                  const { id: userId } = session.user;
                  const {
                      conversationUpdated: {
                          conversation: { participants },
                          removedUserIds,
                      },
                  } = payload;

                  const userIsParticipant = userIsConversationParticipant(
                    participants,
                    userId
                  );

                  const userSentLatestMessage =
                    payload.conversationUpdated.conversation.latestMessage?.senderId ===
                    userId;

                  const userIsBeingRemoved =
                    removedUserIds &&
                    Boolean(removedUserIds.find((id) => id === userId));

                  return (
                    (userIsParticipant && !userSentLatestMessage) ||
                    userSentLatestMessage ||
                    userIsBeingRemoved
                  );
              }
            ),
        },
        conversationDeleted: {
            subscribe: withFilter(
              (_: any, __: any, context: GraphQLContext) => {
                  const { pubsub } = context;

                  return pubsub.asyncIterator(["CONVERSATION_DELETED"]);
              },
              (
                payload: ConversationDeletedSubscriptionPayload,
                _,
                context: GraphQLContext
              ) => {
                  const { session } = context;

                  if (!session?.user) {
                      throw new GraphQLError("Not authorized");
                  }

                  const { id: userId } = session.user;
                  const {
                      conversationDeleted: { participants },
                  } = payload;

                  return userIsConversationParticipant(participants, userId);
              }
            ),
        },
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
