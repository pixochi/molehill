import { combineEpics, ofType, Epic } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { change, FormAction, actionTypes } from 'redux-form';
import { empty, of } from 'rxjs';

import { IReduxAction } from 'app/redux/create-actions';
import { IRootState } from 'app/redux/root-reducer';

import {setNewStatusLocation} from './actions';
import { STATUS_FORM, USE_CURRENT_LOCATION_FIELD } from './status-form';
import { getLat, getLng } from '../map/selectors';

const deselectCurrentLocation: Epic<IReduxAction, any, IRootState> = (action$, state$) => action$.pipe(
  ofType(setNewStatusLocation.type),
  mergeMap((newStatusLocationAction) => {
    const {
      lat,
      lng,
    } = newStatusLocationAction.payload.location;
    const userLat = getLat(state$.value);
    const userLng = getLng(state$.value);

    if (!(lat === userLat && lng === userLng)) {
      return of(change(STATUS_FORM, USE_CURRENT_LOCATION_FIELD, false));
    }
    return empty();
  }),
);

const selectCurrentLocationOnMap: Epic<FormAction, any> = (action$, state$) => action$.pipe(
  ofType(actionTypes.CHANGE),
  mergeMap((reduxFormChangeAction) => {
    const {meta, payload} = reduxFormChangeAction;

    if (meta.form === STATUS_FORM && meta.field === USE_CURRENT_LOCATION_FIELD && payload) {

      const latitude = getLat(state$.value);
      const longitude = getLng(state$.value);

      return of(setNewStatusLocation.action({
        lat: latitude,
        lng: longitude,
      }));

    }

    return empty();
  }),
);

export default combineEpics(
  deselectCurrentLocation,
  selectCurrentLocationOnMap,
);
