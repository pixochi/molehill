import React from 'react';
import { compose } from 'redux';
import { graphql, DataProps } from 'react-apollo';

import { RouteComponentProps } from 'app/typings/react-router';

import {Body} from 'app/components/styleguide/text';
import Spinner from 'app/components/spinner';

import { userById } from './graphql';
import { UserById } from 'app/generated/graphql';

type RouteProps = RouteComponentProps<{userId: string}>;
type UserData = DataProps<{userById: IUserResponse}>;

type Props = RouteProps & UserData;

interface IUserResponse {
  id: string;
  username: string;
}

const UserProfile: React.SFC<Props> = (props) => {

  const {
    computedMatch,
    data,
  } = props;

  if (!data || data.loading) {
    return <Spinner centered margined />;
  }

  return (
    <div>
      <Body>{computedMatch.params.userId}</Body>
      <Body>
        {data && data.userById && data.userById.username}
      </Body>
    </div>
  );
};

export default compose<React.ComponentType>(
  graphql<RouteProps, UserById>(userById, {
    options: (props) => ({
      variables: {
        id: props.computedMatch.params.userId,
      },
    }),
    skip: (props) => !props.computedMatch.params.userId,
  }),
)(UserProfile);
