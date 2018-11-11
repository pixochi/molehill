import { combineEpics, ofType, Epic } from 'redux-observable';
import { tap, ignoreElements, debounceTime, mergeMap } from 'rxjs/operators';
import {actionTypes, FormAction} from 'redux-form';
import { of } from 'rxjs';

import graphqlClient from 'app/graphql-client';
import { IReduxAction } from 'app/redux/create-actions';

import { ADD_STATUS_FORM, USE_CURRENT_LOCATION_FIELD } from './add-status/add-status-form';
import { getHasAddress, getLat, getLng } from './map/selectors';
import { geocodeReverse } from './graphql';
import { setAddress, fetchingAddress } from './map/actions';
import { changeRadius, startAutoRefetchStatuses } from './actions';

const getAddressFromCoordinates: Epic<FormAction, any> = (action$, state$) => action$.pipe(
  ofType(actionTypes.CHANGE),
  tap((reduxFormChangeAction) => {
    const {meta, payload} = reduxFormChangeAction;

    if (meta.form === ADD_STATUS_FORM && meta.field === USE_CURRENT_LOCATION_FIELD &&
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
);
