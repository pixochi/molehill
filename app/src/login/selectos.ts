import {createSelector} from 'reselect';

import { IRootState } from 'app/redux/root-reducer';

export const getUser = (state: IRootState) => state.login.user;

export const getUserId = createSelector(
  getUser,
  (user) => user ? user.id : null,
);
