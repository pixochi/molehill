import { IRootState } from 'app/redux/root-reducer';

export const getFileById = (state: IRootState, props: {id: string}) => state.fileUpload.get(props.id);
