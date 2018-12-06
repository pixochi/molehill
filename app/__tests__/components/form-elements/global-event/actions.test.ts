import {GlobaEventType} from 'app/components/global-event/constants';
import { createActions, makeGlobalEventAction, GLOBAL_EVENT_ACTION_TYPE } from 'app/redux/internals';

describe('Global Event - Actions', () => {

  it('should make a global-event Error action', () => {
    const globalErrorEventAction = JSON.stringify(makeGlobalEventAction(GlobaEventType.ERROR));
    const expected = JSON.stringify(createActions(
      GLOBAL_EVENT_ACTION_TYPE,
      (message, sticky) => ({message, sticky, type: 'ERROR'}),
    ));

    expect(expected).toEqual(globalErrorEventAction);
  });

  it('should make a global-event Success action', () => {
    const globalSuccessEventAction = JSON.stringify(makeGlobalEventAction(GlobaEventType.SUCCESS));
    const expected = JSON.stringify(createActions(
      GLOBAL_EVENT_ACTION_TYPE,
      (message, sticky) => ({message, sticky, type: 'SUCCESS'}),
    ));

    expect(expected).toEqual(globalSuccessEventAction);
  });

});
