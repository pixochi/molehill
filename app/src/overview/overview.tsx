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
import { getCoordinates, ICoordinates } from 'app/components/map/selectors';
import { updateSuccess, updateError } from 'app/components/global-event/actions';

import {statusesInRadius, addStatusMutation} from './graphql';
import AddStatusForm, { IFormData } from './add-status-form';

interface IStateProps {
  userId: string | null;
  coordinates: ICoordinates;
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
    } = this.props;

    return (
      <Flex direction="column">
        <Base grow={1}>
          <Map />
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
    // tslint:disable-next-line:no-console
    console.log({values});

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
            coordinates: [coordinates.lat, coordinates.lng],
          },
          userId,
        },
      },
    }).then(response => {
      if (response) {
        // tslint:disable-next-line:no-console
        console.log({data: response.data});
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
  graphql(statusesInRadius, {
    options: {
      variables: {
        radius: 50,
        latitude: 55,
        longitude: 66,
      },
    },
  }),
  graphql(addStatusMutation),
  withStateMutation(),
)(Overview);
