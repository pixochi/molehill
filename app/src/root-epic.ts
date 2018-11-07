import { combineEpics } from 'redux-observable';

import signUpEpic from 'app/sign-up/epics';
import loginEpic from 'app/login/epics';
import globalEventEpic from 'app/components/global-event/epics';
import overviewEpic from 'app/overview/epics';

export const rootEpic = combineEpics(
  signUpEpic,
  loginEpic,
  globalEventEpic,
  overviewEpic,
);

export default rootEpic;
