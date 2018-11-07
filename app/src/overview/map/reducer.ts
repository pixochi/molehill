import { Record } from 'immutable';

import { IReduxAction } from 'app/redux/create-actions';

import * as Actions from './actions';
import { IAddress } from './types';

interface ILocation {
  permissionAllowed: boolean;
  lat?: number;
  lng?: number;
  currentAddress?: IAddress;
}

export class LocationState extends Record<ILocation>({
  permissionAllowed: false,
  lat: undefined,
  lng: undefined,
  currentAddress: undefined,
}) { }

const locationReducer = (state = new LocationState(), action: IReduxAction) => {
  switch (action.type) {
    case Actions.setLocation.type:
      return state.merge({
        lat: action.payload.lat,
        lng: action.payload.lng,
        permissionAllowed: true,
      });
    case Actions.blockLocation.type:
      return state.merge({
        permissionAllowed: false,
      });
    case Actions.setAddress.type:
      return state.merge({
        currentAddress: {
          ...action.payload.address,
        },
      });
    default:
      return state;
  }
};

export default locationReducer;
