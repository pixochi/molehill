import { Record } from 'immutable';

import { IReduxAction } from 'app/redux/create-actions';
import { LatLngLiteral } from 'leaflet';

import * as Actions from './actions';

export class NewStatusState extends Record<{
  selectedNewStatusLocation?: LatLngLiteral;
}>({
  selectedNewStatusLocation: undefined,
}) { }

const newStatusReducer = (state = new NewStatusState(), action: IReduxAction) => {
  switch (action.type) {
    case Actions.setNewStatusLocation.type:
      return state.merge({
        selectedNewStatusLocation: action.payload.location,
      });
    default:
      return state;
  }
};

export default newStatusReducer;
