import React from 'react';
import { compose } from 'redux';
import { graphql, MutateProps } from 'react-apollo';

import Modal from 'app/components/modal/modal';

import { ModalIds } from 'app/components/modal/constants';
import withStateMutation, { IWithStateMutationProps } from 'app/components/higher-order/with-state-mutation';
import { closeModal } from 'app/components/modal/actions';
import { updateSuccess, updateError } from 'app/components/global-event/actions';

import { updateUserBioMutation, userById } from '../graphql';
import EditProfileForm, { IEditProfileFormProps } from './edit-profile-form';

interface IEditProfileModalProps {
  userId?: string;
}

type Props = IEditProfileModalProps & MutateProps & IWithStateMutationProps;

class EditProfileModal extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.handleUpdateBio = this.handleUpdateBio.bind(this);
  }

  public render() {
    const {
      sMutation,
    } = this.props;

    return (
      <Modal id={ModalIds.editUserProfile} headerTitle="Edit bio">
        <EditProfileForm loading={sMutation.loading} onSubmit={this.handleUpdateBio}/>
      </Modal>
    );
  }

  private handleUpdateBio(values: IEditProfileFormProps) {
    const {
      sMutation,
      userId,
    } = this.props;

    return sMutation.mutate({
      variables: {
        userId,
        bio: values.bio || '',
      },
      refetchQueries: [{
        query: userById,
        variables: {
          id: userId,
        },
      }],
    }).then((response: any) => {
      if (response) {
        closeModal.dispatch(ModalIds.addNewStatus);
        if (!response.data) {
          throw new Error();
        }
        updateSuccess.dispatch('Profile successfully updated');
      }
    }).catch((e: any) => updateError.dispatch('Failed to update your profile.'));
  }
}

export default compose<React.ComponentType<IEditProfileModalProps>>(
  graphql(updateUserBioMutation),
  withStateMutation(),
)(EditProfileModal);
