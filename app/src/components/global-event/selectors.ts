import { IRootState } from 'app/redux/root-reducer';

export const getGlobalEvent = (state: IRootState) => state.globalEvent;
