import {Map} from 'immutable';

import { IReduxAction } from 'app/redux/create-actions';

import * as Actions from './actions';

export const FileUploadState = Map<string, File | {}>();

const fileUploadReducer = (state = FileUploadState, action: IReduxAction) => {
  switch (action.type) {
    case Actions.addFile.type:
      return state.merge({
        [action.payload.fileId]: action.payload.file,
      });
    case Actions.removeFile.type:
      return state.remove(action.payload.fileId);
    default:
      return state;
  }
};

export default fileUploadReducer;
