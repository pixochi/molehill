import {createActions} from 'app/redux/create-actions';

const domain = 'LOCATION';

export const {
  action: setLocation,
} = createActions(
  `${domain}/SET_LOCATION`,
  (lat: number, lng: number) => ({lat, lng}),
);

export const {
  action: blockLocation,
} = createActions(
  `${domain}/BLOCK_LOCATION`,
  () => null,
);
