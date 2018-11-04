import { combineEpics, ofType, Epic } from 'redux-observable';
import { tap, ignoreElements } from 'rxjs/operators';

import {loginSuccess} from 'app/login/actions';
import { saveUserIdToLocalStorage } from './helpers';
import { IReduxAction } from 'app/redux/create-actions';

const storeUserIdInLocalStorage: Epic<IReduxAction<any>, any> = (action$) => action$.pipe(
  ofType(loginSuccess.type),
  tap((loginSuccessAction) => {
    saveUserIdToLocalStorage(loginSuccessAction.payload.user.id);
  }),
  ignoreElements(),
);

export default combineEpics(
  storeUserIdInLocalStorage,
);
