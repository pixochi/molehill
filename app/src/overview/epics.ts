import { combineEpics, ofType, Epic } from 'redux-observable';
import { tap, ignoreElements, debounceTime, mergeMap } from 'rxjs/operators';
import {actionTypes, FormAction} from 'redux-form';
import { of } from 'rxjs';

import graphqlClient from 'app/graphql-client';
import { IReduxAction } from 'app/redux/create-actions';

import { STATUS_FORM, USE_CURRENT_LOCATION_FIELD } from './status-modal/status-form';
import newStatusEpics from './status-modal/epics';
import { getHasAddress, getLat, getLng } from './map/selectors';
import { geocodeReverse } from './graphql';
import { setAddress, fetchingAddress } from './map/actions';
import { changeRadius, startAutoRefetchStatuses } from './actions';
import { setNewStatusLocation } from './status-modal/actions';

const getAddressFromCoordinates: Epic<FormAction, any> = (action$, state$) => action$.pipe(
  ofType(actionTypes.CHANGE),
  tap((reduxFormChangeAction) => {
    const {meta, payload} = reduxFormChangeAction;

    if (meta.form === STATUS_FORM && meta.field === USE_CURRENT_LOCATION_FIELD &&
      payload && !getHasAddress(state$.value)
    ) {

      const latitude = getLat(state$.value);
      const longitude = getLng(state$.value);

      fetchingAddress.dispatch(true);

      graphqlClient.query<{geocodeReverse: any}>({
        query: geocodeReverse,
        variables: {
          latitude,
          longitude,
        },
      }).then(response => {
        setAddress.dispatch(response.data.geocodeReverse.address);
      });
    }
  }),
  ignoreElements(),
);

const getAddressFromMap: Epic<IReduxAction, any> = (action$) => action$.pipe(
  ofType(setNewStatusLocation.type),
  debounceTime(700),
  tap((setLocationAction) => {
    const {lat, lng} = setLocationAction.payload.location;

    fetchingAddress.dispatch(true);

    graphqlClient.query<{geocodeReverse: any}>({
        query: geocodeReverse,
        variables: {
          latitude: lat,
          longitude: lng,
        },
      }).then(response => {
        setAddress.dispatch(response.data.geocodeReverse.address);
      });
  }),
  ignoreElements(),
);

const fetchStatusesOnRadiusChange: Epic<IReduxAction, any> = (action$, state$) => action$.pipe(
  ofType(changeRadius.type),
  debounceTime(900),
  mergeMap(() => {
    return of(startAutoRefetchStatuses.action());
  }),
);

export default combineEpics(
  getAddressFromCoordinates,
  fetchStatusesOnRadiusChange,
  newStatusEpics,
  getAddressFromMap,
);
