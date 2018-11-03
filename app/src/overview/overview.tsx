import React from 'react';
import { compose } from 'redux';
import { graphql } from 'react-apollo';

import Map from 'app/components/map/map';
import Button from 'app/components/button';
import Modal from 'app/components/modal/modal';
import { Flex, Base } from 'app/components/styleguide/layout';

import { ModalIds } from 'app/components/modal/constants';

import {statusesInRadius} from './graphql';
import { openModal } from 'app/components/modal/actions';

class Overview extends React.PureComponent {

  constructor(props: {}) {
    super(props);
    this.handleAddStatusOpen = this.handleAddStatusOpen.bind(this);
  }

  public render() {
    return (
      <Flex direction="column">
        <Base grow={1}>
          <Map />
        </Base>
        <Button text="+ Add" fullWidth onClick={this.handleAddStatusOpen} />
        <Modal id={ModalIds.addNewStatus}>
          <Button text="Add new status" />
        </Modal>
      </Flex>
    );
  }

  private handleAddStatusOpen() {
    openModal.dispatch(ModalIds.addNewStatus);
  }
}

export default compose(
  graphql(statusesInRadius, {
    options: {
      variables: {
        radius: 50,
        latitude: 55,
        longitude: 66,
      },
    },
  }),
)(Overview);
