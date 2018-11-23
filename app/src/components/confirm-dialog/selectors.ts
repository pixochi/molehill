import { IRootState } from 'app/redux/root-reducer';

export const getConfirmDialog = (state: IRootState) => state.confirmDialog;
