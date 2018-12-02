import {createActions} from 'app/redux/create-actions';

const domain = 'AUTH';

export const {
  success: loginSuccess,
  failed: loginFailed,
} = createActions(
  `${domain}/LOGIN`,
  () => null,
  (user) => ({user}),
);

export const {
  action: logOut,
  success: logOutSuccess,
} = createActions(
  `${domain}/LOGOUT`,
  () => null,
);
