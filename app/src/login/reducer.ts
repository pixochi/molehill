import {Record} from 'immutable';

import { IReduxAction } from 'app/redux/create-actions';

import * as Actions from './actions';

interface IUser {
  id: string;
}

export class LoginState extends Record<{
  user: IUser | null,
}>({
  user: null,
}) {}

const loginReducer = (state = new LoginState(), action: IReduxAction) => {
  switch (action.type) {
    case Actions.loginSuccess.type:
      return state.merge({
        user: action.payload.user,
      });
    default:
      return state;
  }
};

export default loginReducer;
