import { Observable, Observer, Subject } from 'rxjs';

import { confirmDialog, dismissDialog, confirmDialogWarning } from './actions';

export const confirmDialogChoiceObservable = new Subject<0 | 1>();

export const confirmDialogObservable: (message: string) => Observable<any> = (message) =>
  Observable.create((observer: Observer<0 | 1>) => {
    confirmDialog.dispatch(message);
    confirmDialogChoiceObservable.subscribe((choice) => {
      dismissDialog.dispatch();
      observer.next(choice);
    });
  });

export const confirmDialogWarningObservable: (message: string) => Observable<any> = (message) =>
  Observable.create((observer: Observer<0 | 1>) => {
    confirmDialogWarning.dispatch(message);
    confirmDialogChoiceObservable.subscribe((choice) => {
      dismissDialog.dispatch();
      observer.next(choice);
    });
  });
