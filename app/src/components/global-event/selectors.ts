import { IRootState } from 'app/redux/root-reducer';

export const eventMessage = (state: IRootState) => state.globalEvent.message;
export const eventType = (state: IRootState) => state.globalEvent.type;
