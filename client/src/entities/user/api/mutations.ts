import {gql} from "@apollo/client";

export const CREATE_USERNAME = gql`
    mutation CreateUsername($username: String!) {
        createUsername(username: $username) {
            success
            error
        }
    }
`;
