import { Observable, Observer, Subject } from 'rxjs';

import { confirmDialog, dismissDialog } from './actions';

export const confirmDialogChoiceObservable = new Subject<0 | 1>();
confirmDialogChoiceObservable.subscribe(console.log);

export const confirmDialogObservable: (message: string) => Observable<any> = (message) =>
  Observable.create((observer: Observer<0 | 1>) => {
    confirmDialog.dispatch(message);
    confirmDialogChoiceObservable.subscribe((choice) => {
      dismissDialog.dispatch();
      observer.next(choice);
    });
  });
