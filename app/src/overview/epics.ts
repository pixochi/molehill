import { combineEpics, ofType, Epic } from 'redux-observable';
import { tap, ignoreElements } from 'rxjs/operators';
import {actionTypes, FormAction} from 'redux-form';

import graphqlClient from 'app/graphql-client';

import { ADD_STATUS_FORM, USE_CURRENT_LOCATION_FIELD } from './add-status-form';
import { getHasAddress, getLat, getLng } from './map/selectors';
import { geocodeReverse } from './graphql';
import { setAddress } from './map/actions';

const getAddressFromCoordinates: Epic<FormAction, any> = (action$, state$) => action$.pipe(
  ofType(actionTypes.CHANGE),
  tap((reduxFormChangeAction) => {
    const {meta, payload} = reduxFormChangeAction;

    if (meta.form === ADD_STATUS_FORM && meta.field === USE_CURRENT_LOCATION_FIELD &&
      payload && !getHasAddress(state$.value)
    ) {

      const latitude = getLat(state$.value);
      const longitude = getLng(state$.value);

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

export default combineEpics(
  getAddressFromCoordinates,
);
