import {createActions} from 'app/redux/create-actions';

const domain = 'STATUS';

export const {
  action: selectStatus,
} = createActions(
  `${domain}/SELECT_STATUS`,
  (id: string) => ({id}),
);
