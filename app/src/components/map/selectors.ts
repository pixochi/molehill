import { IRootState } from 'app/redux/root-reducer';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export type UserCoordinates = Partial<ICoordinates>;

export const getPermissionAllowed = (state: IRootState) => state.location.permissionAllowed;
export const getCoordinates = (state: IRootState) => ({
  lat: state.location.lat,
  lng: state.location.lng,
});
