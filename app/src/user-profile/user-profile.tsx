import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql, MutateProps } from 'react-apollo';

import { RouteComponentProps } from 'app/typings/react-router';
import { s6, s4, s2, s8 } from 'app/components/styleguide/spacing';
import { getFileById } from 'app/components/file-upload/selectors';
import withStateMutation, {IWithStateMutationProps} from 'app/components/higher-order/with-state-mutation';

import {Body, Title} from 'app/components/styleguide/text';
import Spinner from 'app/components/spinner';
import Container from 'app/components/container';
import FileUpload from 'app/components/file-upload/file-upload';
import Button from 'app/components/button';
import { Flex, Base } from 'app/components/styleguide/layout';
import UserImage from 'app/components/user-image';
import Edit from 'app/components/icons/edit';

import { UserById, UploadProfileImageVariables } from 'app/generated/graphql';
import { IRootState } from 'app/redux/root-reducer';
import { removeFile } from 'app/components/file-upload/actions';
import styled from 'app/components/styleguide';
import { ModalIds } from 'app/components/modal/constants';

import { userById, uploadProfileImageMutation } from './graphql';
import { UserData } from './types';
import { getUserId } from 'app/login/selectos';
import { openModal } from 'app/components/modal/actions';

import EditProfile from './edit-profile/edit-profile-modal';

const EditIcon = styled(Edit)`
  cursor: pointer;
`;

type RouteProps = RouteComponentProps<{userId: string}>;

interface IStateProps {
  profileImageFile?: File | {};
  userId?: string;
}

type Props = IStateProps & RouteProps & UserData & MutateProps & IWithStateMutationProps;

const PROFILE_IMAGE_ID = 'profileImage';

class UserProfile extends React.Component<Props, {image: string}> {

  constructor(props: Props) {
    super(props);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.state = {image: ''};
  }

  public render() {
    const {
      computedMatch,
      data,
      profileImageFile,
      sMutation,
      userId,
    } = this.props;

    if (!data || !data.userById || data.loading) {
      return <Spinner centered margined />;
    }

    const isOwnProfile = computedMatch.params.userId === userId;

    return (
      <Container justify="center" withShadow>
        <Flex direction="column" align="center">
          <UserImage imgSrc={data.userById.image} imgSize="120"/>
          {isOwnProfile && (
            <Flex direction="column" align="center" marginTop={s4}>
              <FileUpload
                id={PROFILE_IMAGE_ID}
                uploadBtnText="New profile image"
                required
              />
              {profileImageFile && (
                <Base marginTop={s4} fullWidth>
                  <Button
                    appearance="submit"
                    loading={sMutation.loading}
                    text="Upload"
                    onClick={this.handleFileUpload}
                    fullWidth
                  />
                </Base>
              )}
            </Flex>
          )}
        </Flex>
        <Flex direction="column" marginLeft={s6} marginTop={s8}>
          <Title inline>
            {data.userById.username}
          </Title>
          <Flex align="center" marginTop={s2}>
            <Body disabled>
              {data.userById.bio ? data.userById.bio : (
                isOwnProfile && 'Tell something about yourself...'
              )}
            </Body>
            {isOwnProfile && (
              <Base marginLeft={s2}>
                <EditIcon width={20} height={20} onClick={() => openModal.dispatch(ModalIds.editUserProfile)} />
                <EditProfile userId={userId} />
              </Base>
            )}
          </Flex>
        </Flex>
      </Container>
    );
  }

  private handleFileUpload() {
    const {
      sMutation,
      profileImageFile,
      computedMatch,
    } = this.props;

    sMutation.mutate({
      variables: {
        file: profileImageFile,
        userId: computedMatch.params.userId,
      },
      refetchQueries: [{
        query: userById,
        variables: {
          id: computedMatch.params.userId,
        },
      }],
    }).then((response) => {

      if (response) {
        removeFile.dispatch(PROFILE_IMAGE_ID);
        this.setState({image: response.data.uploadProfileImage.filePath});
      }
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
    userId: getUserId(state),
  })),
)(UserProfile);
