import {createActions} from 'app/redux/create-actions';

const domain = 'GLOBAL_EVENT';

export const {
  action: updateError,
} = createActions(
  `${domain}/ERROR`,
  (message: string) => ({message}),
);

export const {
  action: dismissEvent,
} = createActions(
  `${domain}/DISMISS`,
  () => null,
);
