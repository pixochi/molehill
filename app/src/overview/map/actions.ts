import {createActions} from 'app/redux/create-actions';
import { IAddress } from './types';

const domain = 'LOCATION';

export const {
  action: setLocation,
} = createActions(
  `${domain}/SET_LOCATION`,
  (lat: number, lng: number) => ({lat, lng}),
);

export const {
  action: setAddress,
} = createActions(
  `${domain}/SET_ADDRESS`,
  (address: IAddress) => ({address}),
);

export const {
  action: blockLocation,
} = createActions(
  `${domain}/BLOCK_LOCATION`,
  () => null,
);
