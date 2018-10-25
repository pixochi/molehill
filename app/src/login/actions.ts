import {createActions} from 'app/redux/create-actions';

const domain = 'LOGIN';

export const {
  success: loginSuccess,
  failed: loginFailed,
} = createActions(
  `${domain}`,
  () => null,
  (user) => ({user}),
);
