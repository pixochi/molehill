import gql from 'graphql-tag';

export const userById = gql`
  query userById($id: String!) {
    userById(id: $id) {
      id
      username
    }
  }
`;
