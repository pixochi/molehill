import { Record } from 'immutable';
import { combineReducers } from 'redux';

import { IReduxAction } from 'app/redux/create-actions';

import locationReducer, { LocationState } from './map/reducer';
import * as Actions from './actions';

interface IStatusState {
  selectedId: string;
}

export class StatusState extends Record<IStatusState>({
  selectedId: '',
}) { }

export interface IOverviewState {
  location: LocationState;
  status: StatusState;
}

const statusReducer = (state = new StatusState(), action: IReduxAction) => {
  switch (action.type) {
    case Actions.selectStatus.type:
      return state.merge({
        selectedId: action.payload.id,
      });
    default:
      return state;
  }
};

export default combineReducers({
  location: locationReducer,
  status: statusReducer,
});
