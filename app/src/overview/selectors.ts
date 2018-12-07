import { createSelector } from 'reselect';

import { IRootState } from 'app/redux/root-reducer';

export const getSelectedStatusId = (state: IRootState) => state.overview.status.selectedId;
export const getRadius = (state: IRootState) => state.overview.status.radius;
export const getStatusCategories = (state: IRootState) => state.overview.status.categories;

export const getSelectedCategoryIds = createSelector(
  getStatusCategories,
  (categories) => {
    const selectedCategoryIds = Object.keys(categories).filter(categoryId => categories[categoryId]);
    return selectedCategoryIds.length ? selectedCategoryIds : undefined;
  },
);

export const getRadiusInMeters = createSelector(
  getRadius,
  (radiusInKilometers) => radiusInKilometers * 1000,
);
