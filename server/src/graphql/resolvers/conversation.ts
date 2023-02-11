import {GraphQLContext} from "../../util/types";
import {GraphQLError} from "graphql/error";

const resolvers = {
    Query: {},
    Mutation: {
        createConversation: async (
            _,
            args: { participantIds: string[] },
            context: GraphQLContext
        ) => {
            const { participantIds } = args;
            const { session } = context;

            if (!session?.user) {
                throw new GraphQLError('Not authorized');
            }

            console.log('participantIds', [...participantIds, session.user.id])
        }
    },
}

export default resolvers;
