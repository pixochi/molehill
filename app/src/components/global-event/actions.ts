import {createActions} from 'app/redux/create-actions';

import { GlobaEventType } from './constants';

export const GLOBAL_EVENT_ACTION_TYPE = 'GLOBAL_EVENT';

export const makeGlobalEventAction = (eventType: GlobaEventType) =>
  createActions(
    GLOBAL_EVENT_ACTION_TYPE,
    (message: string, sticky?: boolean) => ({message, sticky, type: eventType}),
  );

export const {
  action: updateError,
} = makeGlobalEventAction(GlobaEventType.ERROR);

export const {
  action: updateSuccess,
} = makeGlobalEventAction(GlobaEventType.SUCCESS);

export const {
  action: dismissEvent,
} = createActions(
  `${GLOBAL_EVENT_ACTION_TYPE}/DISMISS`,
  () => null,
);

export {createActions};
