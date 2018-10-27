import { combineReducers } from 'redux';
import { FormStateMap, reducer as formReducer } from 'redux-form';

import loginReducer, { LoginState } from 'app/login/reducer';
import globalEventReducer, { GlobalEventState } from 'app/components/global-event/reducer';

export interface IRootState {
  form: FormStateMap;
  login: LoginState;
  globalEvent: GlobalEventState;
}

export default combineReducers<IRootState>({
  form: formReducer,
  login: loginReducer,
  globalEvent: globalEventReducer,
});
