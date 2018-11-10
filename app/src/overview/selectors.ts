import { IRootState } from 'app/redux/root-reducer';

export const getSelectedStatusId = (state: IRootState) => state.overview.status.selectedId;
