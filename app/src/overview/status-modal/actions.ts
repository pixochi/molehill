import { LatLngLiteral } from 'leaflet';

import {createActions} from 'app/redux/create-actions';

export const domain = 'NEW_STATUS';

export const {
  action: setNewStatusLocation,
} = createActions(
  `${domain}/SELECT_MAP_LOCATION`,
  (location: LatLngLiteral) => ({location}),
);
