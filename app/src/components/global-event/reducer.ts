import {Record} from 'immutable';

import { IReduxAction } from 'app/redux/internals';

import {updateError, updateSuccess, dismissEvent} from 'app/redux/internals';
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

export const globalEventReducer = (state = new GlobalEventState(), action: IReduxAction) => {
  switch (action.type) {
    case updateError.type:
    case updateSuccess.type:
      return state.merge({
        message: action.payload.message,
        type: action.payload.type,
        sticky: action.payload.sticky,
      });
    case dismissEvent.type:
      return new GlobalEventState();
    default:
      return state;
  }
};

export default globalEventReducer;
