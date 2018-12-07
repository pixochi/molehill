import { combineEpics, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Action } from 'redux';
import { LOCATION_CHANGE } from 'connected-react-router';

import { closeModal } from 'app/components/modal/actions';

const closeModalOnRouteChange = (action$: Observable<Action>) => action$.pipe(
  ofType(LOCATION_CHANGE),
  map(() => closeModal.action()),
);

export default combineEpics(
  closeModalOnRouteChange,
);
