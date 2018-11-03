import {createActions} from 'app/redux/create-actions';

import { ModalIds } from './constants';

const domain = 'MODAL';

export const {
  action: openModal,
} = createActions(
  `${domain}/OPEN`,
  (id: ModalIds) => {
    return {id};
  },
);

export const {
  action: closeModal,
} = createActions(
  `${domain}/CLOSE`,
  () => null,
);
