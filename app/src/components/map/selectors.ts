import { IRootState } from 'app/redux/root-reducer';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export type UserCoordinates = Partial<ICoordinates>;

export const getPermissionAllowed = (state: IRootState) => state.location.permissionAllowed;
export const getLat = (state: IRootState) => state.location.lat;
export const getLng = (state: IRootState) => state.location.lng;
