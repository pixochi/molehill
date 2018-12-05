import {createActions} from 'app/redux/internals';

const domain = 'SIGN_UP';

export const {
  action: signUp,
  success: signUpSuccess,
} = createActions(
  `${domain}`,
  (formData) => ({formData}),
);
