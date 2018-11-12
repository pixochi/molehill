import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      id
      username
      email
    }
  }
`;
