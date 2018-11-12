import {Record} from 'immutable';

import { IReduxAction } from 'app/redux/create-actions';

import * as Actions from './actions';
import { Login_login } from 'app/generated/graphql';

export type User = Pick<Login_login, Exclude<keyof Login_login, '__typename'>>;
export class LoginState extends Record<{
  user: User | null,
}>({
  user: null,
}) {}

const loginReducer = (state = new LoginState(), action: IReduxAction) => {
  switch (action.type) {
    case Actions.loginSuccess.type:
      return state.merge({
        user: action.payload.user,
      });
    case Actions.logOutSuccess.type:
      return new LoginState();
    default:
      return state;
  }
};

export default loginReducer;
