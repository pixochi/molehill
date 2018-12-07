import React from 'react';
import { compose } from 'redux';
import { graphql, DataProps } from 'react-apollo';

import Spinner from 'app/components/spinner';
import {Body} from 'app/components/styleguide/text';
import Like from 'app/components/icons/like';
import { Flex } from 'app/components/styleguide/layout';
import UserImage from 'app/components/user-image';

import { s4, s2, s6 } from 'app/components/styleguide/spacing';
import styled from 'app/components/styleguide';
import { likesByUsers } from 'app/generated/graphql';

import { likesByUsersQuery } from '../graphql';
import { Link } from 'react-router-dom';

const LikeIcon = styled(Like).attrs({
  color: (props: any) => props.theme.errorLight,
  width: 24,
  height: 24,
})``;

interface ILikesUsersProps {
  statusId: string;
}

type LikesUsersData = DataProps<likesByUsers>;

type Props = ILikesUsersProps & LikesUsersData;

class LikesUsers extends React.Component<Props> {

  public render() {
    const {
      data,
    } = this.props;

    if (data.loading || !data.likesByUsers) {
      return <Spinner margined centered />;
    }

    return (
      <Flex direction="column">
        {data.likesByUsers.users.map((likeUser) => (
          <Flex key={likeUser.id} align="center" grow={1} marginTop={s4}>
          <Link to={`/users/${likeUser.id}`}>
            <Flex align="center">
              <UserImage imgSrc={likeUser.image} />
              <Body marginLeft={s2}>{likeUser.username}</Body>
            </Flex>
          </Link>
            <Flex marginLeft={s6} align="center">
              <LikeIcon />
              <Body marginLeft={s2}>{likeUser.likeCount}</Body>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  }

}

export default compose<React.ComponentType<ILikesUsersProps>>(
  graphql<ILikesUsersProps>(likesByUsersQuery, {
    options: (props) => ({
      variables: {
        statusId: props.statusId,
      },
      fetchPolicy: 'cache-and-network',
    }),
  }),
)(LikesUsers);
