import {Record} from 'immutable';

import { IReduxAction, openModal, closeModal, IModalData } from 'app/redux/internals';

import { ModalIds } from './constants';

interface IModalState {
    id: ModalIds | null;
    data?: IModalData;
}

export class ModalState extends Record<IModalState>({
  id: null,
  data: undefined,
}) {}

export const modalReducer = (state = new ModalState(), action: IReduxAction) => {
  switch (action.type) {
    case openModal.type:
      return state.merge({
        id: action.payload.id,
        data: action.payload.data,
      });
    case closeModal.type:
      return new ModalState();
    default:
      return state;
  }
};

export default modalReducer;
