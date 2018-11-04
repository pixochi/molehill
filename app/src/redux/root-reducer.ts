import { combineReducers } from 'redux';
import { FormStateMap, reducer as formReducer } from 'redux-form';

import loginReducer, { LoginState } from 'app/login/reducer';
import globalEventReducer, { GlobalEventState } from 'app/components/global-event/reducer';
import modalReducer, { ModalState } from 'app/components/modal/reducer';
import locationReducer, { LocationState } from 'app/components/map/reducer';

export interface IRootState {
  form: FormStateMap;
  login: LoginState;
  globalEvent: GlobalEventState;
  modal: ModalState;
  location: LocationState;
}

export default combineReducers<IRootState>({
  form: formReducer,
  login: loginReducer,
  globalEvent: globalEventReducer,
  modal: modalReducer,
  location: locationReducer,
});
