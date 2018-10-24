import { combineReducers } from 'redux';
import { FormStateMap, reducer as formReducer } from 'redux-form';

// import signUpReducer from 'app/sign-up/reducer';

export interface IRootState {
  form: FormStateMap;
  // signUp: SignUpState;
}

export default combineReducers<IRootState>({
  form: formReducer,
  // signUp,
});
