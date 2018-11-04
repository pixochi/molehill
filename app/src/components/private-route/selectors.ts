import { IRootState } from 'app/redux/root-reducer';

export const getIsLoggedIn = (state: IRootState): boolean =>
  Boolean(state.login.user && state.login.user.id);
