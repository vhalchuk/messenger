import { gql } from "@apollo/client";

const operation = {
    Queries: {
        searchUsers: gql`
            query SearchUsers($username: String!) {
                searchUsers(username: $username) {
                    id
                    username
                }
            }
        `,
    },
    Mutations: {
        createUsername: gql`
            mutation CreateUsername($username: String!) {
                createUsername(username: $username) {
                    success
                    error
                }
            }   
        `
    },
    Subscriptions: {},
}

export default operation;
