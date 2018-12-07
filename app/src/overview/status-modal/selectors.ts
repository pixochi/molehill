import { createSelector } from 'reselect';

import { IRootState } from 'app/redux/root-reducer';

export const getStatusModalData = ({modal}: IRootState) => {
    return modal.data;
};

export const getEditingStatusId = createSelector(
  getStatusModalData,
  (data) => data && data.statusId,
);

export const getLikeStatusId = createSelector(
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

export const getNewStatusSelectedPosition = (state: IRootState) => state.overview.newStatus.selectedNewStatusLocation;
