// export const getFileById = (state: IRootState, props: {id: string}) => state.fileUpload.get(props.id);
import {Map} from 'immutable';

import {getFileById} from 'app/components/file-upload/selectors';

describe('File Upload Selectors', () => {

    it('should get file by id', () => {
      const mockState = {
        fileUpload: Map({
          fileId: 'file',
        }),
      };
      const file = getFileById(mockState, {id: 'fileId'});

      expect(file).toBe('file');
    });

});
