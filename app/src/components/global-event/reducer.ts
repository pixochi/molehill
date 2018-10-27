import {Record} from 'immutable';

import { IReduxAction } from 'app/redux/create-actions';

import * as Actions from './actions';

export enum GlobaEventType {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface IGlobalEvent {
  message: string | null;
  type: GlobaEventType | null;
}

export class GlobalEventState extends Record<IGlobalEvent>({
  message: null,
  type: null,
}) {}

const loginReducer = (state = new GlobalEventState(), action: IReduxAction) => {
  switch (action.type) {
    case Actions.updateError.type:
      return state.merge({
        message: action.payload.message,
        type: GlobaEventType.ERROR,
      });
    case Actions.dismissEvent.type:
      return new GlobalEventState();
    default:
      return state;
  }
};

export default loginReducer;
