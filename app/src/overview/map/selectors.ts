import { IRootState } from 'app/redux/root-reducer';
import { createSelector } from 'reselect';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export type UserCoordinates = Partial<ICoordinates>;

export const getPermissionAllowed = (state: IRootState) => state.overview.location.permissionAllowed;

export const getLat = (state: IRootState) => state.overview.location.lat;

export const getLng = (state: IRootState) => state.overview.location.lng;

export const getCurrentAddress = (state: IRootState) => state.overview.location.currentAddress;

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
  (address) => {
    if (address) {
      if (address.houseNumber) {
        return `${address.road} ${address.houseNumber}`;
      }
      return address.road;
    }

    return '';
  },
);

export const getIsFetchingAddress = (state: IRootState) => state.overview.location.fetchingAddress;
