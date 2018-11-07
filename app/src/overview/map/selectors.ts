import { IRootState } from 'app/redux/root-reducer';
import { createSelector } from 'reselect';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export type UserCoordinates = Partial<ICoordinates>;

export const getPermissionAllowed = (state: IRootState) => state.location.permissionAllowed;

export const getLat = (state: IRootState) => state.location.lat;

export const getLng = (state: IRootState) => state.location.lng;

export const getCurrentAddress = (state: IRootState) => state.location.currentAddress;

export const getHasAddress = createSelector(
  getCurrentAddress,
  (address) => Boolean(address),
);

export const getCountry = createSelector(
  getCurrentAddress,
  (address) => {
    return address ? address.country : '';
  },
);

export const getSuburb = createSelector(
  getCurrentAddress,
  (address) => address ? address.suburb : '',
);

export const getCity = createSelector(
  getCurrentAddress,
  getSuburb,
  (address, suburb) => {
    return address && address.city ? address.city : suburb;
  },
);

export const getZipCode = createSelector(
  getCurrentAddress,
  (address) => address ? address.postcode : '',
);

export const getStreet = createSelector(
  getCurrentAddress,
  (address) => address ? `${address.road} ${address.houseNumber}` : '',
);
