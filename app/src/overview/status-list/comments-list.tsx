import React from 'react';
import { compose } from 'redux';
import { graphql, DataProps } from 'react-apollo';
import { Link } from 'react-router-dom';

import { StatusComments } from 'app/generated/graphql';
import { s2, s4, s5, s1 } from 'app/components/styleguide/spacing';
import styled from 'app/components/styleguide';

import Spinner from 'app/components/spinner';
import { Flex, Base } from 'app/components/styleguide/layout';
import { Body } from 'app/components/styleguide/text';

import { statusComments } from './graphql';
import UserImage from 'app/components/user-image';
import ShowMore from 'app/components/show-more';

const COMMENTS_LIMIT = 5;

const CommentsListContainer = styled(Base)`
  background-color: ${props => props.theme.backgroundDarker};
`;

const SpinnerContainer = styled(Base)`
  width: 24px;
  height: 24px;
  position: absolute;
  right: -32px;
`;

const Comment = styled(Flex)<{canLoadMore: boolean}>`
  margin-top: 8px;

  &:first-child {
    margin-top: ${props => props.canLoadMore ? 0 : '8px'};
  }
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

interface ICommentsList {
  statusId: string;
}

type Props = ICommentsList & DataProps<StatusComments>;

class CommentsList extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.handleFetchMore = this.handleFetchMore.bind(this);
  }

  public render() {
    const {
      data,
    } = this.props;

    if (!data || !data.statusComments) {
      return null;
    }

    const canLoadMore = data.statusComments.count > data.statusComments.comments.length;

    return (
      <CommentsListContainer paddingHorizontal={s5} paddingBottom={s2}>
        <CommentsInfo align="center" justify="flex-end" marginTop={s1}>
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
                  <UserImage imgSrc={comment.user.image} />
              </Link>
              <Base marginLeft={s4}>
                <Link to={`/users/${comment.user.id}`}>
                  <Body emphasized>{comment.user.username}</Body>
                </Link>
                <ShowMore maxChars={80} textComponent={Body} text={comment.body} />
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
)(CommentsList);

export default CommentsListWithData;
