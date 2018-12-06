import { IRootState } from 'app/redux/root-reducer';
import { createSelector } from 'reselect';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export type UserCoordinates = Partial<ICoordinates>;

// remove! 'true', only for dev purposes
export const getPermissionAllowed = (state: IRootState) => state.overview.location.permissionAllowed || true;

export const getLat = (state: IRootState) => state.overview.location.lat || 55; // remove! only for dev purposes

export const getLng = (state: IRootState) => state.overview.location.lng || 55; // remove! only for dev purposes

export const getCurrentAddress = (state: IRootState) => state.overview.location.currentAddress;

export const getStopAutoRefetchStatuses = (state: IRootState) => state.overview.status.stopAutoRefetchStatuses;

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
        return `${address.road || 'unknown'} ${address.houseNumber}`;
      }
      return address.road;
    }

    return '';
  },
);

export const getIsFetchingAddress = (state: IRootState) => state.overview.location.fetchingAddress;
