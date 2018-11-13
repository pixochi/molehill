import { combineReducers } from 'redux';
import { FormStateMap, reducer as formReducer } from 'redux-form';

import loginReducer, { LoginState } from 'app/login/reducer';
import globalEventReducer, { GlobalEventState } from 'app/components/global-event/reducer';
import modalReducer, { ModalState } from 'app/components/modal/reducer';
import overviewReducer, { IOverviewState } from 'app/overview/reducer';
import fileUploadReducer, { FileUploadState } from 'app/components/file-upload/reducer';

export interface IRootState {
  form: FormStateMap;
  login: LoginState;
  globalEvent: GlobalEventState;
  modal: ModalState;
  overview: IOverviewState;
  fileUpload: typeof FileUploadState;
}

export default combineReducers<IRootState>({
  form: formReducer,
  login: loginReducer,
  globalEvent: globalEventReducer,
  modal: modalReducer,
  overview: overviewReducer,
  fileUpload: fileUploadReducer,
});
