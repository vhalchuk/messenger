import {gql} from "@apollo/client";

export const GET_USERS = gql`
    query SearchUsers($username: String!) {
        searchUsers(username: $username) {
            id
            username
        }
    }
`;
