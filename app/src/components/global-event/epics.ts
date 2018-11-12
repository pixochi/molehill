import { combineEpics, ofType, Epic } from 'redux-observable';
import { mergeMap, filter, map, takeUntil } from 'rxjs/operators';
import { timer } from 'rxjs';

import { IReduxAction } from 'app/redux/create-actions';
import { GLOBAL_EVENT_ACTION_TYPE, dismissEvent } from './actions';

const HIDE_GLOBAL_EVENT_TIMEOUT = 4000; // ms

const globalEvent: Epic<IReduxAction<any>, any> = (action$) => action$.pipe(
  ofType(GLOBAL_EVENT_ACTION_TYPE),
  filter(globalEventAction => !globalEventAction.payload.sticky),
  mergeMap(() => {
    return timer(HIDE_GLOBAL_EVENT_TIMEOUT).pipe(
      map(() => {
        return dismissEvent.action();
      }),
      takeUntil(
        action$.ofType(GLOBAL_EVENT_ACTION_TYPE),
      ),
    );
  }),
);

export default combineEpics(
  globalEvent,
);
