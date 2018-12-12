import React from 'react';
import { compose } from 'redux';
import { graphql, MutateProps, DataProps } from 'react-apollo';
import { connect } from 'react-redux';

import Modal from 'app/components/modal/modal';

import { ModalIds } from 'app/components/modal/constants';
import withStateMutation, { IWithStateMutationProps } from 'app/components/higher-order/with-state-mutation';
import { updateSuccess, updateError } from 'app/components/global-event/actions';
import { closeModal } from 'app/components/modal/actions';
import { IRootState } from 'app/redux/root-reducer';
import client from 'app/graphql-client';
import { getUserId } from 'app/login/selectos';
import { userById } from 'app/user-profile/graphql';
import {
  StatusInput,
  StatusesInRadius,
  StatusesInRadiusVariables,
  UserById,
  AddStatusVariables,
} from 'app/generated/graphql';

import AddStatusForm, { IInitialValues } from './status-form';

import { addStatusMutation, statusesInRadius, editStatusMutation } from '../graphql';
import { getRadiusInMeters } from '../selectors';
import { getEditingStatusId, getStatusModalHeader } from './selectors';

interface IAddStatusProps {
  userId: string | null;
  userLat?: number;
  userLng?: number;
}

interface IStateProps {
  radius: number;
  userId: string;
  editingStatusId?: string;
  header?: string;
}

type Props = IAddStatusProps & IStateProps & MutateProps & IWithStateMutationProps & DataProps<UserById>;

class AddStatus extends React.Component<Props, IInitialValues> {

  constructor(props: Props) {
    super(props);
    this.handleAddStatus = this.handleAddStatus.bind(this);
    this.handleEditStatus = this.handleEditStatus.bind(this);
    this.getStatusInitialValues = this.getStatusInitialValues.bind(this);
    this.state = {
      initialValues: null,
    };
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.editingStatusId && prevProps.editingStatusId !== this.props.editingStatusId
        || (prevProps.editingStatusId && !this.props.editingStatusId)) {
      this.setState({
        initialValues: this.getStatusInitialValues(),
      });
    }
  }

  public render() {
    const {
      addStatusMutation,
      header,
    } = this.props;

    const {
      initialValues,
    } = this.state;

    return (
      <Modal id={ModalIds.status} headerTitle={header}>
        <AddStatusForm
          loading={initialValues ? editStatusMutation.loading : addStatusMutation.loading}
          onSubmit={initialValues ? this.handleEditStatus : this.handleAddStatus}
          initialValues={this.state.initialValues}
        />
      </Modal>
    );
  }

  private handleAddStatus(values: StatusInput) {
    const {
      addStatusMutation,
      userId,
      userLat,
      userLng,
      radius,
      data,
    } = this.props;

    const {useCurrentLocation, ...formValues} = values;
    // Used for not having all statuses at the very same point
    const RANDOMIZER = Math.random() / Math.floor(Math.random() * 100) * (Math.random() > 0.5 ? 1 : -1);
    const statusLocation = useCurrentLocation ? {
      type: 'Point',
      coordinates: [
        Number(userLat) + RANDOMIZER,
        Number(userLng) + RANDOMIZER,
      ], // TODO: remove RANDOMIZER and check if userCoordinates are available
    } : null;

    return addStatusMutation.mutate({
      variables: {
        status: {
          ...formValues,
          useCurrentLocation,
          location: statusLocation,
          userId,
        },
      },
      // update locally cached statuses data
      update: (store, addStatusResult) => {
        const statusesInRadiusData = store.readQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
          query: statusesInRadius,
          variables: {
            radius: this.props.radius,
            latitude: this.props.userLat as number,
            longitude: this.props.userLng as number,
            skip: false,
          },
        });

        if (statusesInRadiusData) {
          store.writeQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
            query: statusesInRadius,
            variables: {
              radius,
              latitude: userLat as number,
              longitude: userLng as number,
              skip: false,
            },
            data: {
              statusesInRadius: {
                ...statusesInRadiusData.statusesInRadius,
                statuses: [
                  {
                    ...addStatusResult.data.addStatus,
                    statusLikes: [],
                    user: data.userById,
                    attendance: 0,
                  },
                  ...statusesInRadiusData.statusesInRadius.statuses,
                ],
              },
            },
          });
        }
      },
    }).then((response: any) => {
      if (response) {
        closeModal.dispatch(ModalIds.status);
        if (!response.data) {
          throw new Error();
        }
        updateSuccess.dispatch('New status successfully added.');
      }
    }).catch((e: any) => updateError.dispatch('Failed to add a new status.'));
  }

  private handleEditStatus(values: StatusInput) {
    const {
      editStatusMutation,
      editingStatusId,
      userLat,
      userLng,
    } = this.props;

    const {useCurrentLocation, ...formValues} = values;
    // Used for not having all statuses at the very same point
    const RANDOMIZER = Math.random() / Math.floor(Math.random() * 100) * (Math.random() > 0.5 ? 1 : -1);
    const statusLocation = useCurrentLocation ? {
      type: 'Point',
      coordinates: [
        Number(userLat) + RANDOMIZER,
        Number(userLng) + RANDOMIZER,
      ], // TODO: remove RANDOMIZER and check if userCoordinates are available
    } : null;

    return editStatusMutation.mutate({
      variables: {
        status: {
          ...formValues,
          useCurrentLocation,
          location: statusLocation,
          id: editingStatusId,
        },
      },
    }).then((response: any) => {
      if (response) {
        closeModal.dispatch(ModalIds.status);
        if (!response.data) {
          throw new Error();
        }
        updateSuccess.dispatch('Status successfully updated.');
      }
    }).catch((e: any) => updateError.dispatch('Failed to edit the status.'));
  }

  private getStatusInitialValues() {

    const {
      radius,
      userLat,
      userLng,
      editingStatusId,
    } = this.props;

    try {
      const statusesInRadiusData = client.store.getCache()
      .readQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
        query: statusesInRadius,
        variables: {
          radius,
          latitude: userLat as number,
          longitude: userLng as number,
          skip: false,
        },
      });

      if (statusesInRadiusData && editingStatusId) {
        const selectedStatus = statusesInRadiusData.statusesInRadius.statuses.find(
          status => status.id === editingStatusId,
        );

        if (selectedStatus) {
          const {title, description, country, street, city, zipCode, category} = selectedStatus;
          return {
            title,
            description,
            country,
            street,
            city,
            zipCode,
            categoryId: category.id,
          };
        }
        return null;
      }
    } catch (error) {
      console.log({error});
      return null;
    }
    return null;
  }
}

export default compose<React.ComponentType<IAddStatusProps>>(
  connect<IStateProps, {}, IAddStatusProps, IRootState>((state) => ({
    radius: getRadiusInMeters(state),
    userId: getUserId(state),
    editingStatusId: getEditingStatusId(state),
    header: getStatusModalHeader(state),
  })),
  graphql<IStateProps>(userById, {
    options: (props) => ({
      variables: {
        id: props.userId,
      },
    }),
  }),
  graphql<AddStatus, AddStatusVariables>(addStatusMutation, {name: 'addStatusMutation'}),
  withStateMutation({name: 'addStatusMutation'}),
  graphql(editStatusMutation, {name: 'editStatusMutation'}),
  withStateMutation({name: 'editStatusMutation'}),
)(AddStatus);
