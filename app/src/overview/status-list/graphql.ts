import gql from 'graphql-tag';

export const addCommentMutation = gql`
  mutation AddComment($comment: CommentInput!) {
    addComment(comment: $comment) {
      id
      createdAt
    }
  }
`;

export const deleteCommentMutation = gql`
  mutation DeleteComment($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const editCommentMutation = gql`
  mutation EditComment($comment: EditCommentInput!) {
    editComment(comment: $comment) {
      id
      body
    }
  }
`;

export const statusComments = gql`
  query StatusComments($statusId: String!, $cursor: String, $limit: Int) {
    statusComments(statusId: $statusId, cursor: $cursor, limit: $limit)
    @connection(key: "commentCursor", filter: ["statusId"]) {
      comments {
        id
        createdAt
        body
        user {
          id
          username
          image
        }
      }
      count
    }
  }
`;
