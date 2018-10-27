import { combineEpics } from 'redux-observable';
import signUpEpic from 'app/sign-up/epics';

export const rootEpic = combineEpics(
  signUpEpic,
);

export default rootEpic;
