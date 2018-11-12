import { combineEpics, ofType, Epic } from 'redux-observable';
import { tap, ignoreElements, map } from 'rxjs/operators';

import { IReduxAction } from 'app/redux/create-actions';

import {loginSuccess, logOut, logOutSuccess} from './actions';
import { saveUserToLocalStorage, removeUserFromLocalStorage } from './helpers';

const storeUserIdInLocalStorage: Epic<IReduxAction<any>, any> = (action$) => action$.pipe(
  ofType(loginSuccess.type),
  tap((loginSuccessAction) => {
    saveUserToLocalStorage(loginSuccessAction.payload.user);
  }),
  ignoreElements(),
);

const logOutUser: Epic<IReduxAction<any>, any> = (action$) => action$.pipe(
  ofType(logOut.type),
  map(() => {
    removeUserFromLocalStorage();
    return logOutSuccess.action();
  }),
);

export default combineEpics(
  storeUserIdInLocalStorage,
  logOutUser,
);
