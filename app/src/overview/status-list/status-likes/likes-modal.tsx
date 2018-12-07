import React from 'react';

import Modal from 'app/components/modal/modal';

import { ModalIds } from 'app/components/modal/constants';

import LikesUsers from './likes-users';

interface ILikesModalProps {
  statusId: string;
}

class LikesModal extends React.Component<{header: any} & ILikesModalProps> {

  public render() {
    const {
      header,
      statusId,
    } = this.props;

    return (
      <Modal id={ModalIds.statusLikes} headerTitle={header}>
        <LikesUsers statusId={statusId} />
      </Modal>
    );
  }

}

export default LikesModal;
