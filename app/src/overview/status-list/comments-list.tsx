import React from 'react';
import { compose } from 'redux';
import { graphql, DataProps } from 'react-apollo';
import { Link } from 'react-router-dom';

import { StatusComments } from 'app/generated/graphql';
import { s2, s4 } from 'app/components/styleguide/spacing';

import Spinner from 'app/components/spinner';
import { Flex, Base } from 'app/components/styleguide/layout';
import { Body } from 'app/components/styleguide/text';

import { statusComments } from './graphql';
import UserImage from 'app/components/user-image';
import ShowMore from 'app/components/show-more';

interface ICommentsList {
  statusId: string;
}

type Props = ICommentsList & DataProps<StatusComments>;

const CommentsList: React.SFC<Props> = (props) => {

  const {
    data,
  } = props;

  if (!data || !data.statusComments) {
    return null;
  }

  if (data.loading) {
    return <Spinner />;
  }

  return (
    <>
      {data.statusComments.map(comment => (
        <Flex key={comment.id} align="center" marginTop={s2}>
          <Link to={`/users/${comment.user.id}`}>
            <Flex align="center">
              <UserImage imgSrc={comment.user.image} />
              <Body marginLeft={s2}>{comment.user.username}</Body>
            </Flex>
          </Link>
          <Base marginLeft={s4}>
            <ShowMore textComponent={Body} text={comment.body} />
          </Base>
        </Flex>
      ))}
    </>
  );
};

export default compose<React.ComponentType<ICommentsList>>(
  graphql<ICommentsList, StatusComments>(statusComments, {
    options: (props) => ({
      variables: {
        statusId: props.statusId,
      },
    }),
  }),
)(CommentsList);
