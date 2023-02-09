import {CreateUsernameResponse, GraphQLContext} from "../../util/types";

const resolvers = {
    Query: {
        searchUsers: () => {},
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
