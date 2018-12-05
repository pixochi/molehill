import {Map} from 'immutable';

import {addFile, removeFile, fileUploadReducer} from 'app/redux/internals';

describe('File Upload Reducer', () => {

    it('should add file to state', () => {
      const mockState = Map();
      const fileId = 'fileId';
      const file = 'file';
      const addFileAction = addFile.action(fileId, file);
      
      const updatedState = fileUploadReducer(mockState, addFileAction);
      const expectedState = Map({
        [fileId]: file,
      });

      expect(expectedState).toEqual(updatedState);
    });

    it('should remove file from state', () => {
      const fileId = 'fileId';
      const mockState = Map({
        [fileId]: 'file',
      });

      const removeFileAction = removeFile.action(fileId);
      
      const updatedState = fileUploadReducer(mockState, removeFileAction);
      const expectedState = Map();

      expect(expectedState).toEqual(updatedState);
    });

});
