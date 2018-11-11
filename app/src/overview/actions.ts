import {createActions} from 'app/redux/create-actions';

const domain = 'STATUS';

export const {
  action: selectStatus,
} = createActions(
  `${domain}/SELECT_STATUS`,
  (id: string) => ({id}),
);

export const {
  action: changeRadius,
} = createActions(
  `${domain}/CHANGE_RADIUS`,
  (newRadius: number, stopAutoRefetchStatuses?: boolean) => ({newRadius, stopAutoRefetchStatuses}),
);

export const {
  action: startAutoRefetchStatuses,
} = createActions(
  `${domain}/START_AUTO_REFETCH`,
  () => null,
);
