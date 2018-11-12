import gql from 'graphql-tag';

export const userById = gql`
  query UserById($id: String!) {
    userById(id: $id) {
      id
      username
    }
  }
`;
