import {createActions} from 'app/redux/create-actions';

const domain = 'STATUS';

export const {
  action: deleteStatus,
} = createActions(
  `${domain}/DELETE_STATUS`,
  (id: string) => ({id}),
);
