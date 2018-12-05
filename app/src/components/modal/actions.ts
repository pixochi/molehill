import {createActions} from 'app/redux/internals';

import { ModalIds } from './constants';

const domain = 'MODAL';

export interface IModalData {
  [x: string]: any;
}

export const {
  action: openModal,
} = createActions(
  `${domain}/OPEN`,
  (id: ModalIds, data: IModalData) => {
    return {id, data};
  },
);

export const {
  action: closeModal,
} = createActions(
  `${domain}/CLOSE`,
  () => null,
);
