import React from 'react';
import { compose } from 'redux';
import { DataProps, graphql } from 'react-apollo';
import { connect } from 'react-redux';

import { getUserId } from 'app/login/selectos';
import { IRootState } from 'app/redux/root-reducer';
import { StatusesByUser, StatusesByUserVariables } from 'app/generated/graphql';
import styled from 'app/components/styleguide';

import Container from 'app/components/container';
import Spinner from 'app/components/spinner';
import {Body} from 'app/components/styleguide/text';
import StatusItem from 'app/overview/status-list/status-item';
import { Flex } from 'app/components/styleguide/layout';

import { statusesByUser } from '../graphql';

const UserStatusesContainer = styled(Container)`
  width: 70%;
  max-width: 600px;
`;

interface IStateProps {
  userId: string;
}

type Props = IStateProps & DataProps<StatusesByUser>;

const UserStatuses: React.SFC<Props> = (props) => {

  const {
    data,
  } = props;

  if (data.loading) {
    return <Spinner margined centered />;
  }

  if ((data.statusesByUser && !data.statusesByUser.statuses.length) || !data.statusesByUser) {
    return (
      <Container>
        <Body>No statuses yet</Body>
      </Container>
    );
  }

  return (
    <UserStatusesContainer noPadding>
      <Flex direction="column" fullWidth>
        {data.statusesByUser.statuses.map((status) => (
          <StatusItem key={status.id} status={status} />
        ))}

      </Flex>
    </UserStatusesContainer>
  );
};

export default compose<React.ComponentType>(
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    userId: getUserId(state),
  })),
  graphql<IStateProps, StatusesByUser, StatusesByUserVariables>(statusesByUser, {
    options: (props) => ({
      variables: {
        userId: props.userId,
      },
      fetchPolicy: 'cache-and-network',
    }),
  }),
)(UserStatuses);
