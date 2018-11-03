import { IRootState } from 'app/redux/root-reducer';

import { ModalIds } from './constants';

export const getIsOpen = (state: IRootState, props: {id: ModalIds}) => state.modal.id === props.id;
