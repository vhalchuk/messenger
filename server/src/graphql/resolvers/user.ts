import {CreateUsernameResponse, GraphQLContext} from "../../util/types";
import {GraphQLError} from "graphql/error";
import { User } from "@prisma/client";

const resolvers = {
    Query: {
        searchUsers:  async (
            _,
            args: { username: string },
            context: GraphQLContext
        ): Promise<User[]> => {
            const { username: searchedUsername } = args;
            const { session, prisma } = context;

            if (!session?.user) {
                throw new GraphQLError('Not authorized');
            }

            const { user: { username: inquirerUsername } } = session;

            try {
                return await prisma.user.findMany({
                    where: {
                        username: {
                            contains: searchedUsername,
                            not: inquirerUsername,
                            mode: 'insensitive'
                        }
                    }
                });
            } catch (error) {
                throw new GraphQLError(error?.message);
            }
        },
    },
    Mutation: {
        createUsername: async (
            _,
            args: { username: string },
            context: GraphQLContext
        ): Promise<CreateUsernameResponse> => {
            const { username } = args;
            const { session, prisma } = context;

            if (!session?.user) {
                return {
                    error: 'Not authorized',
                }
            }

            try {
                const existingUser = await prisma.user.findUnique({
                    where: { username }
                });

                if (existingUser) {
                    return {
                        error: 'Username already taken. Try another'
                    }
                }

                await prisma.user.update({
                    where: {
                        id: session.user.id
                    },
                    data: { username }
                })

                return { success: true };
            } catch (error) {
                return {
                    error: error.message,
                }
            }
        },
    },
}

export default resolvers;
