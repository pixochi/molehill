import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Modal from 'app/components/modal/modal';

import { ModalIds } from 'app/components/modal/constants';
import { getStatusModalData } from 'app/overview/status-modal/selectors';

import AttendanceUsers from './attendance-users';
import { IRootState } from 'app/redux/root-reducer';

interface IStateProps {
  userIds: string[];
}

class AttendanceModal extends React.Component<{header: any} & IStateProps> {

  public render() {
    const {
      header,
      userIds,
    } = this.props;

    return (
      <Modal id={ModalIds.statusAttendance} headerTitle={header}>
        <AttendanceUsers userIds={userIds} />
      </Modal>
    );
  }

}

export default compose(
  connect((state: IRootState) => ({
    userIds: getStatusModalData(state) ? getStatusModalData(state)!.userIds : [],
  })),
)(AttendanceModal);
