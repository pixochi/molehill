import React from 'react';
import { compose } from 'redux';
import { graphql, DataProps, MutateProps } from 'react-apollo';
import { Link } from 'react-router-dom';

import { StatusComments, EditComment, EditCommentVariables } from 'app/generated/graphql';
import { s2, s4, s5, s1 } from 'app/components/styleguide/spacing';
import styled from 'app/components/styleguide';
import { formatCreatedAt } from 'app/helpers/time';

import Spinner from 'app/components/spinner';
import { Flex, Base } from 'app/components/styleguide/layout';
import { Body } from 'app/components/styleguide/text';

import UserImage from 'app/components/user-image';
import ShowMore from 'app/components/show-more';
import MenuButton from 'app/components/menu-button';

import { statusComments, editCommentMutation } from './graphql';
import { deleteComment } from './actions';
import EditCommentForm, { IEditCommentFormProps } from './edit-comment-form';

const COMMENTS_LIMIT = 5;

const CommentsListContainer = styled(Base)`

`;

const SpinnerContainer = styled(Base)`
  width: 24px;
  height: 24px;
  position: absolute;
  right: -32px;
`;

const CommentsInfo = styled(Flex)`
  position: relative;
`;

const LoadMoreContainer = styled(Flex)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const LoadMore = styled(Body)`
  color: ${props => props.theme.info};
`;

const StyledMenuButton = styled(MenuButton)`
  margin-left: auto;
  padding: 0 8px;
  opacity: 0;
`;

const Comment = styled(Flex)<{canLoadMore: boolean}>`
  margin-top: 8px;

  &:first-child {
    margin-top: ${props => props.canLoadMore ? 0 : '8px'};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.border.default};
    padding-bottom: 8px;
  }

  &:hover {
    ${StyledMenuButton} {
      opacity: 1;
    }
  }
`;

interface ICommentsList {
  statusId: string;
  userId: string;
}

type Props = ICommentsList & DataProps<StatusComments> & MutateProps<EditComment, EditCommentVariables>;

interface ICommentsListState {
  editingCommentId: string | null;
}

class CommentsList extends React.Component<Props, ICommentsListState> {

  constructor(props: Props) {
    super(props);
    this.handleFetchMore = this.handleFetchMore.bind(this);
    this.handleEditComment = this.handleEditComment.bind(this);
    this.state = {
      editingCommentId: null,
    };
  }

  public render() {
    const {
      data,
      userId,
      statusId,
    } = this.props;

    if (!data || !data.statusComments || !data.statusComments.count) {
      return null;
    }

    const canLoadMore = data.statusComments.count > data.statusComments.comments.length;

    return (
      <CommentsListContainer paddingHorizontal={s5} paddingBottom={s2}>
        <CommentsInfo align="center" justify="flex-end" marginVertical={s1}>
          {canLoadMore && (
            <LoadMoreContainer align="center">
              <LoadMore clickable onClick={this.handleFetchMore}>Load more</LoadMore>
              <SpinnerContainer>
                {data.loading && (
                  <Spinner />
                )}
              </SpinnerContainer>
            </LoadMoreContainer>
          )}
            <Body>{data.statusComments.count} comments</Body>
        </CommentsInfo>
        <Base>
          {[...data.statusComments.comments].reverse().map(comment => (
            <Comment key={comment.id} align="flex-start" canLoadMore={canLoadMore}>
              <Link to={`/users/${comment.user.id}`}>
                  <UserImage imgSrc={comment.user.image} imgSize={32}/>
              </Link>
              <Base marginLeft={s4} fullWidth>
                <Flex align="center">
                  <Link to={`/users/${comment.user.id}`}>
                    <Body emphasized>{comment.user.username}</Body>
                  </Link>
                  <Body disabled marginLeft={s2}>{formatCreatedAt(comment.createdAt)}</Body>
                  {comment.user.id === userId && (
                    <StyledMenuButton
                      options={[
                        {
                          title: 'Edit',
                          onClick: () => this.setState({editingCommentId: comment.id}),
                        },
                        {
                          title: 'Delete',
                          onClick: () => deleteComment.dispatch(comment.id, statusId),
                        },
                      ]}
                    />
                  )}
                </Flex>
                {this.state.editingCommentId === comment.id ? (
                  <EditCommentForm onSubmit={this.handleEditComment(comment.id)} initialValues={{body: comment.body}} />
                ) : (
                  <ShowMore maxChars={80} textComponent={Body} text={comment.body} />
                )}
              </Base>
            </Comment>
          ))}
        </Base>
      </CommentsListContainer>
    );
  }

  private handleFetchMore() {
    const {
      data,
      statusId,
    } = this.props;

    const {
      fetchMore,
      loading,
      statusComments,
    } = data;

    if (!loading && statusComments && statusComments.comments.length) {
      fetchMore({
        variables: {
          statusId,
          limit: COMMENTS_LIMIT,
          cursor: statusComments.comments[statusComments.comments.length - 1].id,
        },
        updateQuery: (prevResult, {fetchMoreResult}) => {
          return {
            statusComments: {
              ...prevResult.statusComments,
              comments: [
                ...prevResult.statusComments.comments,
                ...fetchMoreResult.statusComments.comments,
              ],
            },
          };
        },
      });
    }
  }

  private handleEditComment(commentId: string) {
    return (values: IEditCommentFormProps) => {
      this.props.mutate({
        variables: {
          comment: {
            commentId,
            body: values.body,
          },
        },
      }).then(() => {
        this.setState({editingCommentId: null});
      });
    };
  }
}

const CommentsListWithData = compose<React.ComponentType<ICommentsList>>(
  graphql<ICommentsList, StatusComments>(statusComments, {
    options: (props) => ({
      variables: {
        statusId: props.statusId,
        limit: 3,
      },
      notifyOnNetworkStatusChange: true,
    }),
  }),
  graphql<EditComment, EditCommentVariables>(editCommentMutation),
)(CommentsList);

export default CommentsListWithData;
