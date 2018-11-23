import {Record} from 'immutable';

import { IReduxAction } from 'app/redux/create-actions';

import * as Actions from './actions';
import { ConfirmDialogType } from './constants';

export interface IGlobalEvent {
  message: string | null;
  type: ConfirmDialogType | null;
}

export class ConfirmDialogState extends Record<IGlobalEvent>({
  message: null,
  type: null,
}) {}

const loginReducer = (state = new ConfirmDialogState(), action: IReduxAction) => {
  switch (action.type) {
    case Actions.confirmDialog.type:
    case Actions.confirmDialogWarning.type:
      return state.merge({
        message: action.payload.message,
        type: action.payload.type,
      });
    case Actions.dismissDialog.type:
      return new ConfirmDialogState();
    default:
      return state;
  }
};

export default loginReducer;
