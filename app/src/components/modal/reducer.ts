import {Record} from 'immutable';

import { IReduxAction } from 'app/redux/create-actions';

import * as Actions from './actions';
import { ModalIds } from './constants';
import { IModalData } from './actions';

interface IModalState {
    id: ModalIds | null;
    data?: IModalData;
}

export class ModalState extends Record<IModalState>({
  id: null,
  data: undefined,
}) {}

const modalReducer = (state = new ModalState(), action: IReduxAction) => {
  switch (action.type) {
    case Actions.openModal.type:
      return state.merge({
        id: action.payload.id,
        data: action.payload.data,
      });
    case Actions.closeModal.type:
      return new ModalState();
    default:
      return state;
  }
};

export default modalReducer;
