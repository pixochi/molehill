import {createActions} from 'app/redux/create-actions';

const domain = 'FILE_UPLOAD';

export const {
  action: addFile,
} = createActions(
  `${domain}/ADD_FILE`,
  (fileId: string, file: File) => ({fileId, file}),
);
