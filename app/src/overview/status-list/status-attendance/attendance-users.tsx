import React from 'react';
import { compose } from 'redux';
import { graphql, DataProps } from 'react-apollo';

import Spinner from 'app/components/spinner';
import {Body} from 'app/components/styleguide/text';
import { Flex } from 'app/components/styleguide/layout';
import UserImage from 'app/components/user-image';

import { s4, s2 } from 'app/components/styleguide/spacing';
import { usersById } from 'app/generated/graphql';

import { statusAttendanceUsersQuery } from '../graphql';
import { Link } from 'react-router-dom';

interface IAttendanceUsersProps {
  userIds: string[];
}

type AttendanceUsersData = DataProps<usersById>;

type Props = IAttendanceUsersProps & AttendanceUsersData;

class AttendanceUsers extends React.Component<Props> {

  public render() {
    const {
      data,
    } = this.props;

    if (data && data.loading) {
      return <Spinner margined centered />;
    }

    if (!data || !data.usersById) {
      return (
        <Body disabled textAlign="center">Nobody has joined this status yet</Body>
      );
    }

    return (
      <Flex direction="column">
        {data.usersById.map((user) => (
          <Flex key={user.id} align="center" grow={1} marginTop={s4}>
          <Link to={`/users/${user.id}`}>
            <Flex align="center">
              <UserImage imgSrc={user.image} />
              <Body marginLeft={s2}>{user.username}</Body>
            </Flex>
          </Link>
          </Flex>
        ))}
      </Flex>
    );
  }

}

export default compose<React.ComponentType<IAttendanceUsersProps>>(
  graphql<IAttendanceUsersProps>(statusAttendanceUsersQuery, {
    options: (props) => ({
      variables: {
        ids: props.userIds,
      },
      fetchPolicy: 'cache-and-network',
    }),
    skip: (props: Props) => !props.userIds || !props.userIds.length,
  }),
)(AttendanceUsers);
