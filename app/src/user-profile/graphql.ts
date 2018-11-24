import gql from 'graphql-tag';

import { statusFragment } from 'app/overview/graphql';

export const userById = gql`
  query UserById($id: String!) {
    userById(id: $id) {
      id
      username
      image
      bio
    }
  }
`;

export const statusesByUser = gql`
  query StatusesByUser($userId: String!) {
    statusesByUser(userId: $userId) {
      statuses {
        ...StatusFragment
      }
    }
  }
  ${statusFragment}
`;

export const uploadProfileImageMutation = gql`
  mutation UploadProfileImage($file: Upload!, $userId: String!) {
    uploadProfileImage(file: $file, userId: $userId) {
      filePath
    }
  }
`;

export const updateUserBioMutation = gql`
  mutation UpdateUserBioMutation($bio: String!, $userId: String!) {
    updateUserBio(bio: $bio, userId: $userId) {
      id
      bio
    }
  }
`;
