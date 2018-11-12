import React from 'react';
import { compose } from 'redux';
import { graphql, DataProps, MutateProps } from 'react-apollo';

import { RouteComponentProps } from 'app/typings/react-router';

import {Body} from 'app/components/styleguide/text';
import Spinner from 'app/components/spinner';

import { userById, uploadProfileImageMutation } from './graphql';
import { UserById, UploadProfileImageVariables } from 'app/generated/graphql';

type RouteProps = RouteComponentProps<{userId: string}>;
type UserData = DataProps<UserById>;

type Props = RouteProps & UserData & MutateProps;

const UserProfile: React.SFC<Props> = (props) => {

  const {
    computedMatch,
    data,
    mutate,
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
      <input
        type="file"
        required
        onChange={({
          target: {
            validity,
            files: fileList,
          },
        }) => validity.valid && mutate({ variables: { file: fileList![0] } })}
      />
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
  graphql<RouteProps & UserById, UploadProfileImageVariables>(uploadProfileImageMutation),
)(UserProfile);
