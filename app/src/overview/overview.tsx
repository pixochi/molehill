import React from 'react';
import { compose } from 'redux';
import { graphql, MutateProps } from 'react-apollo';
import { connect } from 'react-redux';

import Button from 'app/components/button';
import Modal from 'app/components/modal/modal';
import { Flex, Base } from 'app/components/styleguide/layout';

import { ModalIds } from 'app/components/modal/constants';
import withStateMutation, { IWithStateMutationProps } from 'app/components/higher-order/with-state-mutation';
import { openModal, closeModal } from 'app/components/modal/actions';
import { IRootState } from 'app/redux/root-reducer';
import { getUserId } from 'app/login/selectos';
import { updateSuccess, updateError } from 'app/components/global-event/actions';
import { RADIUS } from 'app/constants';

import { getLat, getLng } from './map/selectors';
import {addStatusMutation, statusesInRadius} from './graphql';

import AddStatusForm, { IFormData } from './add-status-form';
import Map from './map/map';

interface IStateProps {
  userId: string | null;
  userLat?: number;
  userLng?: number;
}

type Props = IStateProps & MutateProps & IWithStateMutationProps;

class Overview extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
    this.handleOpenAddStatus = this.handleOpenAddStatus.bind(this);
    this.handleAddStatus = this.handleAddStatus.bind(this);
  }

  public render() {
    const {
      sMutation,
      userLat,
      userLng,
    } = this.props;

    return (
      <Flex direction="column">
        <Base grow={1}>
          <Map userLat={userLat} userLng={userLng}/>
        </Base>
        <Button appearance="submit" text="+ Add" fullWidth onClick={this.handleOpenAddStatus} />
        <Modal id={ModalIds.addNewStatus} headerTitle="Add status">
          <AddStatusForm loading={sMutation.loading} onSubmit={this.handleAddStatus}/>
        </Modal>
      </Flex>
    );
  }

  private handleOpenAddStatus() {
    openModal.dispatch(ModalIds.addNewStatus);
  }

  private handleAddStatus(values: IFormData) {
    const {
      sMutation,
      userId,
      userLat,
      userLng,
    } = this.props;

    const {useCurrentLocation, ...formValues} = values;
    // Used for not having all statuses at the very same point
    const RANDOMIZER = Math.random() / Math.floor(Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1);
    const statusLocation = useCurrentLocation ? {
      type: 'Point',
      coordinates: [
        Number(userLat) + RANDOMIZER,
        Number(userLng) + RANDOMIZER,
      ], // TODO: remove RANDOMIZER and check if userCoordinates are available
    } : null;

    return sMutation.mutate({
      variables: {
        status: {
          ...formValues,
          useCurrentLocation,
          location: statusLocation,
          userId,
        },
      },
      refetchQueries: [{
        query: statusesInRadius,
        variables: {
          radius: RADIUS,
          latitude: userLat,
          longitude: userLng,
        },
      }],
    }).then(response => {
      if (response) {
        closeModal.dispatch(ModalIds.addNewStatus);
        if (!response.data) {
          throw new Error();
        }
        updateSuccess.dispatch('New status successfully added.');
      }
    }).catch(e => updateError.dispatch('Failed to add a new status.'));
  }
}

export default compose(
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    userId: getUserId(state),
    userLat: getLat(state),
    userLng: getLng(state),
  })),
  graphql(addStatusMutation),
  withStateMutation(),
)(Overview);
