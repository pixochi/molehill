import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      id
      username
      email
    }
  }
`;
