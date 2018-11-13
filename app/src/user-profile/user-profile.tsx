import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql, DataProps, MutateProps } from 'react-apollo';

import { RouteComponentProps } from 'app/typings/react-router';
import { s6, s8, s4 } from 'app/components/styleguide/spacing';
import { getFileById } from 'app/components/file-upload/selectors';
import withStateMutation, {IWithStateMutationProps} from 'app/components/higher-order/with-state-mutation';

import {Body, Title} from 'app/components/styleguide/text';
import Spinner from 'app/components/spinner';
import Container from 'app/components/container';
import ProfileImageDefault from 'app/components/icons/profile-image-default';
import FileUpload from 'app/components/file-upload/file-upload';
import Button from 'app/components/button';
import { Flex, Base } from 'app/components/styleguide/layout';

import { userById, uploadProfileImageMutation } from './graphql';
import { UserById, UploadProfileImageVariables } from 'app/generated/graphql';
import { IRootState } from 'app/redux/root-reducer';

type RouteProps = RouteComponentProps<{userId: string}>;
type UserData = DataProps<UserById>;

interface IStateProps {
  profileImageFile?: File | {};
}

type Props = IStateProps & RouteProps & UserData & MutateProps & IWithStateMutationProps;

const PROFILE_IMAGE_ID = 'profileImage';

class UserProfile extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  public render() {
    const {
      computedMatch,
      data,
      profileImageFile,
      sMutation,
    } = this.props;

    if (!data || data.loading) {
      return <Spinner centered margined />;
    }

    return (
      <Container justify="center" align="center" height={160}>
        <Flex align="center">
          <ProfileImageDefault size="120" />
          <Flex direction="column" marginLeft={s6}>
            <Title inline>
              {data && data.userById && data.userById.username}
            </Title>
            <Body>{computedMatch.params.userId}</Body>
          </Flex>
        </Flex>
        <Flex direction="column" marginLeft={s8}>
          <FileUpload
            id={PROFILE_IMAGE_ID}
            required
          />
          {profileImageFile && (
            <Base marginTop={s4}>
              <Button
                appearance="submit"
                loading={sMutation.loading}
                text="Upload"
                onClick={this.handleFileUpload}
              />
            </Base>
          )}
        </Flex>
      </Container>
    );
  }

  private handleFileUpload() {
    const {
      sMutation,
      profileImageFile,
    } = this.props;

    sMutation.mutate({
      variables: {
        file: profileImageFile,
      },
    });
  }
}

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
  withStateMutation(),
  connect<IStateProps, {}, RouteProps & UserById & MutateProps, IRootState>((state) => ({
    profileImageFile: getFileById(state, {id: PROFILE_IMAGE_ID}),
  })),
)(UserProfile);
