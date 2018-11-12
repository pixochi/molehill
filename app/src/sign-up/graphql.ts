import gql from 'graphql-tag';

export const signUpMutation = gql`
  mutation CreateUser($user: SignUpInput!) {
    createUser(user: $user) {
      id
      username
      email
    }
  }
`;
