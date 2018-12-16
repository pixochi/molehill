import { combineEpics, ofType, Epic } from 'redux-observable';
import { from } from 'rxjs';
import {mergeMap, filter, map} from 'rxjs/operators';

import { confirmDialogWarningObservable, confirmDialogObservable } from 'app/components/confirm-dialog/epics';
import client from 'app/graphql-client';
import { IReduxAction } from 'app/redux/create-actions';
import { updateSuccess } from 'app/components/global-event/actions';
import {
  StatusesInRadius,
  StatusesInRadiusVariables,
  StatusComments,
  StatusCommentsVariables,
} from 'app/generated/graphql';

import { deleteStatus, deleteComment, joinStatus, leaveStatus } from './actions';
import { deletetatusMutation, statusesInRadius } from '../graphql';
import { getRadiusInMeters } from '../selectors';
import { getLat, getLng } from '../map/selectors';
import { deleteCommentMutation, statusComments, addAttendanceMutation, deleteAttendanceMutation } from './graphql';
import { getUserId } from 'app/login/selectos';

const deleteStatusEpic: Epic<IReduxAction> = (action$, state$) => action$.pipe(
  ofType(deleteStatus.type),
  mergeMap(({payload}) => {
    return confirmDialogWarningObservable('Do you want to delete the status permanently?').pipe(
      filter(didConfirm => didConfirm),
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
                    count: statusesData.statusesInRadius.count - 1,
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

const deleteStatusCommentEpic: Epic<IReduxAction> = (action$) => action$.pipe(
  ofType(deleteComment.type),
  mergeMap(({payload}) => {
    return confirmDialogWarningObservable('Do you want to delete the comment permanently?').pipe(
      filter(didConfirm => didConfirm),
      mergeMap(() => {
        const {statusId} = payload;

        return from(client.mutate({
          mutation: deleteCommentMutation,
          variables: {
            id: payload.id,
          },
          update: (store) => {
            const commentsData = store.readQuery<StatusComments, StatusCommentsVariables>({
              query: statusComments,
              variables: {
                statusId,
              },
            });

            if (commentsData) {
              store.writeQuery<StatusComments, StatusCommentsVariables>({
                query: statusComments,
                variables: {
                  statusId,
                },
                data: {
                  statusComments: {
                    ...commentsData.statusComments,
                    comments: commentsData.statusComments.comments.filter(comment => comment.id !== payload.id),
                    count: commentsData.statusComments.count - 1,
                  },
                },
              });
            }
          },
        })).pipe(
          map(() => updateSuccess.action('Comment has been deleted')),
        );
      }),
    );
  }),
);

const joinStatusEpic: Epic<IReduxAction> = (action$, state$) => action$.pipe(
  ofType(joinStatus.type),
  mergeMap(({payload}) => {
    return confirmDialogObservable('Do you wish to join?').pipe(
      filter(didConfirm => didConfirm),
      mergeMap(() => {
        const {statusId} = payload;
        const userId = getUserId(state$.value);
        const radius = getRadiusInMeters(state$.value);
        const userLat = getLat(state$.value);
        const userLng = getLng(state$.value);

        return from(client.mutate({
          mutation: addAttendanceMutation,
          variables: {
            attendance: {
              statusId,
              userId,
            },
          },
          update: (store, addAttendanceResult) => {
            const statusesData = store.readQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
              query: statusesInRadius,
              variables: {
                radius,
                latitude: userLat as number,
                longitude: userLng as number,
                skip: false,
              },
            });

            if (statusesData && addAttendanceResult.data) {
              const joinedStatusIndex = statusesData.statusesInRadius.statuses.findIndex(({id}) => id === statusId);

              if (joinedStatusIndex !== -1) {
                const joinedStatus = statusesData.statusesInRadius.statuses[joinedStatusIndex];

                const updatedJoinedStatus = {
                  ...joinedStatus,
                  attendance: [
                    ...joinedStatus.attendance,
                    {
                      id: addAttendanceResult.data!.addAttendance.id,
                      user: {
                        id: userId,
                        __typename: 'User' as 'User',
                      },
                      __typename: 'Attendance' as 'Attendance',
                    },
                  ],
                };

                store.writeQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
                  query: statusesInRadius,
                  variables: {
                    radius,
                    latitude: userLat as number,
                    longitude: userLng as number,
                    skip: false,
                  },
                  data: {
                    statusesInRadius: {
                      ...statusesData.statusesInRadius,
                      statuses: [
                        ...statusesData.statusesInRadius.statuses.slice(0, joinedStatusIndex),
                        updatedJoinedStatus,
                        ...statusesData.statusesInRadius.statuses.slice(joinedStatusIndex + 1),
                      ],
                    },
                  },
                });
              }
            }
          },
        })).pipe(
          map(() => updateSuccess.action('You have joined the status')),
        );
      }),
    );
  },
));

const leaveStatusEpic: Epic<IReduxAction> = (action$, state$) => action$.pipe(
  ofType(leaveStatus.type),
  mergeMap(({payload}) => {
    return confirmDialogWarningObservable('Do you wish to leave?').pipe(
      filter(didConfirm => didConfirm),
      mergeMap(() => {
        const {attendanceId, statusId} = payload;
        const radius = getRadiusInMeters(state$.value);
        const userLat = getLat(state$.value);
        const userLng = getLng(state$.value);

        return from(client.mutate({
          mutation: deleteAttendanceMutation,
          variables: {
            id: attendanceId,
          },
          update: (store, deleteAttendanceResult) => {
            const statusesData = store.readQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
              query: statusesInRadius,
              variables: {
                radius,
                latitude: userLat as number,
                longitude: userLng as number,
                skip: false,
              },
            });

            if (statusesData && deleteAttendanceResult.data) {
              const leftStatusIndex = statusesData.statusesInRadius.statuses.findIndex(({id}) => id === statusId);

              if (leftStatusIndex !== -1) {
                const leftStatus = statusesData.statusesInRadius.statuses[leftStatusIndex];

                const updatedLeftStatus = {
                  ...leftStatus,
                  attendance: leftStatus.attendance.filter(a => a.id !== attendanceId),
                };

                store.writeQuery<StatusesInRadius, Partial<StatusesInRadiusVariables>>({
                  query: statusesInRadius,
                  variables: {
                    radius,
                    latitude: userLat as number,
                    longitude: userLng as number,
                    skip: false,
                  },
                  data: {
                    statusesInRadius: {
                      ...statusesData.statusesInRadius,
                      statuses: [
                        ...statusesData.statusesInRadius.statuses.slice(0, leftStatusIndex),
                        updatedLeftStatus,
                        ...statusesData.statusesInRadius.statuses.slice(leftStatusIndex + 1),
                      ],
                    },
                  },
                });
              }
            }
          },
        })).pipe(
          map(() => updateSuccess.action('You have left the status')),
        );
      }),
    );
  },
));

export default combineEpics(
  deleteStatusEpic,
  deleteStatusCommentEpic,
  joinStatusEpic,
  leaveStatusEpic,
);
