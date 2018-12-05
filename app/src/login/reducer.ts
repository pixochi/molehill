import {Record} from 'immutable';

import {IReduxAction, loginSuccess, logOutSuccess} from 'app/redux/internals';
import { Login_login } from 'app/generated/graphql';

export type User = Pick<Login_login, Exclude<keyof Login_login, '__typename'>>;
export class LoginState extends Record<{
  user: User | null,
}>({
  user: null,
}) {}

export const loginReducer = (state = new LoginState(), action: IReduxAction) => {
  switch (action.type) {
    case loginSuccess.type:
      return state.merge({
        user: action.payload.user,
      });
    case logOutSuccess.type:
      return new LoginState();
    default:
      return state;
  }
};

export default loginReducer;
