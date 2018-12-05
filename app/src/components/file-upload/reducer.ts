import {Map} from 'immutable';

import {addFile, removeFile, IReduxAction} from 'app/redux/internals';

export const FileUploadState = Map<string, File | {}>();

export const fileUploadReducer = (state = FileUploadState, action: IReduxAction) => {
  switch (action.type) {
    case addFile.type:
      return state.merge({
        [action.payload.fileId]: action.payload.file,
      });
    case removeFile.type:
      return state.remove(action.payload.fileId);
    default:
      return state;
  }
};

export default fileUploadReducer;
