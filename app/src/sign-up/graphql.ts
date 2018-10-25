import gql from 'graphql-tag';

export const signUpMutation = gql`
  mutation createUser($user: SignUpInput!) {
    createUser(user: $user) {
      id
      username
      email
    }
  }
`;
