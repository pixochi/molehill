import { createSelector } from 'reselect';

import { getUserId } from 'app/login/selectos';

export const getIsLoggedIn = createSelector(
  getUserId,
  (userId): boolean => Boolean(userId),
);
