import { combineEpics } from 'redux-observable';
import signUpEpic from 'app/sign-up/epics';
import loginEpic from 'app/login/epics';

export const rootEpic = combineEpics(
  signUpEpic,
  loginEpic,
);

export default rootEpic;
