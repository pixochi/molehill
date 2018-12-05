import {getIsOpen} from 'app/components/modal/selectors';
import {ModalState} from 'app/components/modal/reducer';

describe('Modal Selectors', () => {

    it('should find open modal by id', () => {
      const mockState = {
        modal: ModalState({id: 'openModalId'}),
      };
      const isOpen = getIsOpen(mockState, {id: 'openModalId'});

      expect(isOpen).toBe(true);
    });

    it('should find close modal by id', () => {
      const mockState = {
        modal: ModalState({id: ''}),
      };
      const isOpen = getIsOpen(mockState, {id: 'openModalId'});

      expect(isOpen).toBe(false);
    });

});


