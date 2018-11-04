import { combineEpics } from 'redux-observable';

import signUpEpic from 'app/sign-up/epics';
import loginEpic from 'app/login/epics';
import globalEventEpic from 'app/components/global-event/epics';

export const rootEpic = combineEpics(
  signUpEpic,
  loginEpic,
  globalEventEpic,
);

export default rootEpic;
