import React from 'react';
import { compose } from 'redux';
import { graphql, MutateProps } from 'react-apollo';
import { connect } from 'react-redux';

import Map from 'app/components/map/map';
import Button from 'app/components/button';
import Modal from 'app/components/modal/modal';
import { Flex, Base } from 'app/components/styleguide/layout';

import { ModalIds } from 'app/components/modal/constants';
import withStateMutation, { IWithStateMutationProps } from 'app/components/higher-order/with-state-mutation';
import { openModal, closeModal } from 'app/components/modal/actions';
import { IRootState } from 'app/redux/root-reducer';
import { getUserId } from 'app/login/selectos';
import { getCoordinates, UserCoordinates } from 'app/components/map/selectors';
import { updateSuccess, updateError } from 'app/components/global-event/actions';

import {addStatusMutation, statusesInRadius} from './graphql';
import AddStatusForm, { IFormData } from './add-status-form';

const RADIUS = 20; // km

interface IStateProps {
  userId: string | null;
  coordinates: UserCoordinates;
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
      coordinates,
    } = this.props;

    return (
      <Flex direction="column">
        <Base grow={1}>
          <Map userCoordinates={coordinates}/>
        </Base>
        <Button text="+ Add" fullWidth onClick={this.handleOpenAddStatus} />
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
      coordinates,
    } = this.props;

    return sMutation.mutate({
      variables: {
        status: {
          ...values,
          location: {
            type: 'Point',
            coordinates: [
              Number(coordinates.lat) + Math.random() / 5000,
              Number(coordinates.lng) + Math.random() / 5000,
            ], // TODO: remove random() and check if userCoordinates are available
          },
          userId,
        },
      },
      refetchQueries: [{
        query: statusesInRadius,
        variables: {
          radius: RADIUS,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
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
    coordinates: getCoordinates(state),
  })),
  graphql(addStatusMutation),
  withStateMutation(),
)(Overview);
