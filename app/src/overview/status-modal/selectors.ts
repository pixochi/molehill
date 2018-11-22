import { createSelector } from 'reselect';

import { IRootState } from 'app/redux/root-reducer';
import { ModalIds } from 'app/components/modal/constants';

export const getStatusModalData = ({modal}: IRootState) => {
  if (modal.id === ModalIds.status) {
    return modal.data;
  }
  return null;
};

export const getEditingStatusId = createSelector(
  getStatusModalData,
  (data) => data && data.statusId,
);

export const getStatusModalHeader = createSelector(
  getStatusModalData,
  (data) => data && data.header,
);

export const getStatusModalSubmitText = createSelector(
  getStatusModalData,
  (data) => data && data.submitText,
);
