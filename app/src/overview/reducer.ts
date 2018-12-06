import { Record } from 'immutable';
import { combineReducers } from 'redux';

import { IReduxAction } from 'app/redux/create-actions';

import locationReducer, { LocationState } from './map/reducer';
import newStatusReducer, { NewStatusState } from './status-modal/reducer';
import * as Actions from './actions';
import { RADIUS_DEFAULT } from './constants';

interface IStatusState {
  selectedId: string;
  radius: number;
  stopAutoRefetchStatuses: boolean;
}

export class StatusState extends Record<IStatusState>({
  selectedId: '',
  radius: RADIUS_DEFAULT, // km
  stopAutoRefetchStatuses: false,
}) { }

export interface IOverviewState {
  location: LocationState;
  status: StatusState;
  newStatus: NewStatusState;
}

const statusReducer = (state = new StatusState(), action: IReduxAction) => {
  switch (action.type) {
    case Actions.selectStatus.type:
      return state.merge({
        selectedId: action.payload.id,
      });
    case Actions.changeRadius.type:
      return state.merge({
        radius: action.payload.newRadius,
        stopAutoRefetchStatuses: action.payload.stopAutoRefetchStatuses,
      });
      case Actions.startAutoRefetchStatuses.type:
        return state.merge({
          stopAutoRefetchStatuses: false,
        });
    default:
      return state;
  }
};

export default combineReducers({
  location: locationReducer,
  status: statusReducer,
  newStatus: newStatusReducer,
});
