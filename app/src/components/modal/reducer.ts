import {Record} from 'immutable';

import { IReduxAction } from 'app/redux/create-actions';

import * as Actions from './actions';
import { ModalIds } from './constants';

interface IModalState {
    id: ModalIds | null;
}

export class ModalState extends Record<IModalState>({
  id: null,
}) {}

const modalReducer = (state = new ModalState(), action: IReduxAction) => {
  switch (action.type) {
    case Actions.openModal.type:
      return state.merge({
        id: action.payload.id,
      });
    case Actions.closeModal.type:
      return new ModalState();
    default:
      return state;
  }
};

export default modalReducer;
