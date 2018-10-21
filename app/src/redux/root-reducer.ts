import { combineReducers } from 'redux';
import { FormStateMap, reducer as formReducer } from 'redux-form'

export interface IRootState {
  form: FormStateMap,
}

export default combineReducers<IRootState>({
  form: formReducer,
});