import gql from 'graphql-tag';

export const addCommentMutation = gql`
  mutation AddComment($comment: CommentInput!) {
    addComment(comment: $comment) {
      id
    }
  }
`;

export const statusComments = gql`
  query StatusComments($statusId: String!, $cursor: String, $limit: Int) {
    statusComments(statusId: $statusId, cursor: $cursor, limit: $limit)
    @connection(key: "commentCursor", filter: ["statusId"]) {
      comments {
        id
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
