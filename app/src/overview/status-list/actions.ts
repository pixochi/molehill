import {createActions} from 'app/redux/create-actions';

const domain = 'STATUS';

export const {
  action: deleteStatus,
} = createActions(
  `${domain}/DELETE_STATUS`,
  (id: string) => ({id}),
);

export const {
  action: deleteComment,
} = createActions(
  `${domain}/DELETE_COMMENT`,
  (id: string, statusId: string) => ({id, statusId}),
);

export const {
  action: joinStatus,
} = createActions(
  `${domain}/JOIN_STATUS`,
  (statusId: string) => ({statusId}),
);

export const {
  action: leaveStatus,
} = createActions(
  `${domain}/LEAVE_STATUS`,
  (attendanceId: string, statusId: string) => ({attendanceId, statusId}),
);
