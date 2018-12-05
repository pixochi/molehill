import { combineReducers } from 'redux';
import { FormStateMap, reducer as formReducer } from 'redux-form';

import {
  modalReducer,
  ModalState,
  globalEventReducer,
  GlobalEventState,
  loginReducer,
  LoginState,
  fileUploadReducer,
  FileUploadState,
} from 'app/redux/internals';
import overviewReducer, { IOverviewState } from 'app/overview/reducer';
import confirmDialogReducer, { ConfirmDialogState } from 'app/components/confirm-dialog/reducer';

export interface IRootState {
  form: FormStateMap;
  login: LoginState;
  globalEvent: GlobalEventState;
  modal: ModalState;
  overview: IOverviewState;
  fileUpload: typeof FileUploadState;
  confirmDialog: ConfirmDialogState;
}

export default combineReducers<IRootState>({
  form: formReducer,
  login: loginReducer,
  globalEvent: globalEventReducer,
  modal: modalReducer,
  overview: overviewReducer,
  fileUpload: fileUploadReducer,
  confirmDialog: confirmDialogReducer,
});
