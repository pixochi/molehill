import { createSelector } from 'reselect';

import { IRootState } from 'app/redux/root-reducer';

export const getSelectedStatusId = (state: IRootState) => state.overview.status.selectedId;
export const getRadius = (state: IRootState) => state.overview.status.radius;

export const getRadiusInMeters = createSelector(
  getRadius,
  (radiusInKilometers) => radiusInKilometers * 1000,
);
