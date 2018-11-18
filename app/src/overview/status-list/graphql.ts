import gql from 'graphql-tag';

export const addCommentMutation = gql`
  mutation AddComment($comment: CommentInput!) {
    addComment(comment: $comment) {
      id
    }
  }
`;

export const statusComments = gql`
  query StatusComments($statusId: String!) {
    statusComments(statusId: $statusId) {
      id
      body
      user {
        id
        username
        image
      }
    }
  }
`;
