import { combineEpics } from 'redux-observable';

import signUpEpic from 'app/sign-up/epics';
import loginEpic from 'app/login/epics';
import globalEventEpic from 'app/components/global-event/epics';
// import confirmDialogEpic from 'app/components/confirm-dialog/epics';
import overviewEpic from 'app/overview/epics';
import statusEpic from 'app/overview/status-list/epics';

export const rootEpic = combineEpics(
  signUpEpic,
  loginEpic,
  globalEventEpic,
  overviewEpic,
  statusEpic,
  // confirmDialogEpic,
);

export default rootEpic;
