// export class ModalState extends Record<IModalState>({
//   id: null,
//   data: undefined,
// }) {}

// export const modalReducer = (state = new ModalState(), action: IReduxAction) => {
//   switch (action.type) {
//     case openModal.type:
//       return state.merge({
//         id: action.payload.id,
//         data: action.payload.data,
//       });
//     case closeModal.type:
//       return new ModalState();
//     default:
//       return state;
//   }
// };

import {Map} from 'immutable';

import {openModal, closeModal, modalReducer, ModalState} from 'app/redux/internals';

describe('Modal Reducer', () => {

    it('should open Modal', () => {
      const mockState = new ModalState();
      const modalId = 'modalId';
      const openModalAction = openModal.action(modalId);
      
      const updatedState = modalReducer(mockState, openModalAction);
      const expectedState = new ModalState({id: modalId})

      expect(expectedState).toEqual(updatedState);
    });

    it('should close Modal', () => {
      const modalId = 'modalId';
      const mockState = new ModalState({id: modalId})
      const closeModalAction = closeModal.action(modalId);
      
      const updatedState = modalReducer(mockState, closeModalAction);
      const expectedState = new ModalState()

      expect(expectedState).toEqual(updatedState);
    });

    it('should return original state by default', () => {
      const mockState = new ModalState()
      const anyAction = {type: 'any_action'};
      
      const updatedState = modalReducer(mockState, anyAction);

      expect(updatedState).toEqual(mockState);
    });

});
