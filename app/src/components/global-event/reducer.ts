import {Record} from 'immutable';

import { IReduxAction } from 'app/redux/create-actions';

import * as Actions from './actions';
import { GlobaEventType } from './constants';

export interface IGlobalEvent {
  message: string | null;
  type: GlobaEventType | null;
  sticky: boolean;
}

export class GlobalEventState extends Record<IGlobalEvent>({
  message: null,
  type: null,
  sticky: false,
}) {}

const loginReducer = (state = new GlobalEventState(), action: IReduxAction) => {
  switch (action.type) {
    case Actions.updateError.type:
    case Actions.updateSuccess.type:
      return state.merge({
        message: action.payload.message,
        type: action.payload.type,
        sticky: action.payload.sticky,
      });
    case Actions.dismissEvent.type:
      return new GlobalEventState();
    default:
      return state;
  }
};

export default loginReducer;
