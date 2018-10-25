import { combineReducers } from 'redux';
import { FormStateMap, reducer as formReducer } from 'redux-form';

import loginReducer, { LoginState } from 'app/login/reducer';
// import signUpReducer from 'app/sign-up/reducer';

export interface IRootState {
  form: FormStateMap;
  // signUp: SignUpState;
  login: LoginState;
}

export default combineReducers<IRootState>({
  form: formReducer,
  login: loginReducer,
});
