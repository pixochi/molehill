import {createActions} from 'app/redux/create-actions';

import { ConfirmDialogType } from './constants';

export const CONFIRM_DIALOG_ACTION_TYPE = 'CONFIRM_DIALOG';

const makeConfirmDialogAction = (dialogType: ConfirmDialogType) =>
  createActions(
    CONFIRM_DIALOG_ACTION_TYPE,
    (message: string) => ({message, type: dialogType}),
  );

export const {
  action: confirmDialogWarning,
} = makeConfirmDialogAction(ConfirmDialogType.WARNING);

export const {
  action: confirmDialog,
} = makeConfirmDialogAction(ConfirmDialogType.INFO);

export const {
  action: dismissDialog,
} = createActions(
  `${CONFIRM_DIALOG_ACTION_TYPE}/DISMISS`,
  (value: 0 | 1) => ({value}),
);
