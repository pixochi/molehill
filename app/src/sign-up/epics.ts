import { combineEpics, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Action } from 'redux';

import {loginSuccess} from 'app/login/actions';
import { dismissEvent } from 'app/components/global-event/actions';

const dissmissErrorOnSignupSuccess = (action$: Observable<Action>) => action$.pipe(
  ofType(loginSuccess.type),
  map(() => dismissEvent.action()),
);

export default combineEpics(
  dissmissErrorOnSignupSuccess,
);
