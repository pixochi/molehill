import { combineEpics, ofType, Epic } from 'redux-observable';
import { from } from 'rxjs';
import {mergeMap, filter, map} from 'rxjs/operators';

import { confirmDialogWarningObservable } from 'app/components/confirm-dialog/epics';
import client from 'app/graphql-client';
import { IReduxAction } from 'app/redux/create-actions';
import { updateSuccess } from 'app/components/global-event/actions';
import { StatusesInRadius, StatusesInRadiusVariables } from 'app/generated/graphql';

import { deleteStatus } from './actions';
import { deletetatusMutation, statusesInRadius } from '../graphql';
import { getRadiusInMeters } from '../selectors';
import { getLat, getLng } from '../map/selectors';

const deleteStatusEpic: Epic<IReduxAction> = (action$, state$) => action$.pipe(
  ofType(deleteStatus.type),
  mergeMap(({payload}) => {
    return confirmDialogWarningObservable('Do you want to delete the status permanently?').pipe(
      filter(choice => choice),
      mergeMap(() => {

        return from(client.mutate({
          mutation: deletetatusMutation,
          variables: {
            statusId: payload.id,
          },
          update: (store, deleteStatusResult) => {
            const radiusInMeters = getRadiusInMeters(state$.value);
            const userLat = getLat(state$.value);
            const userLng = getLng(state$.value);

            const statusesData = store.readQuery<StatusesInRadius, StatusesInRadiusVariables>({
              query: statusesInRadius,
              variables: {
                radius: radiusInMeters,
                latitude: userLat as number,
                longitude: userLng as number,
                skip: false,
              },
            });

            if (statusesData && deleteStatusResult.data) {
              store.writeQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
                query: statusesInRadius,
                variables: {
                  radius: radiusInMeters,
                  latitude: userLat as number,
                  longitude: userLng as number,
                  skip: false,
                },
                data: {
                  statusesInRadius: {
                    ...statusesData.statusesInRadius,
                    statuses: statusesData.statusesInRadius.statuses.filter(
                      status => status.id !== deleteStatusResult.data!.deleteStatus.id),
                  },
                },
              });
            }
          },
        })).pipe(
          map(() => updateSuccess.action('Status has been deleted')),
        );
      }),
    );
  }),
);

export default combineEpics(
  deleteStatusEpic,
);
