import {makeGlobalEventAction, GLOBAL_EVENT_ACTION_TYPE, createActions} from 'app/components/global-event/actions';
import {GlobaEventType} from 'app/components/global-event/constants';

describe('Global Event - Actions', () => {

  it('should make a global-event Error action', () => {
    const globalErrorEventAction = makeGlobalEventAction(GlobaEventType.ERROR);
    const expected = createActions(
      GLOBAL_EVENT_ACTION_TYPE,
      (message, sticky) => ({message, sticky, type: 'ERROR'}),
    );

    expect(expected).toBe(globalErrorEventAction);
  });

  it('should make a global-event Success action', () => {
    const globalSuccessEventAction = makeGlobalEventAction(GlobaEventType.SUCCESS);
    const expected = createActions(
      GLOBAL_EVENT_ACTION_TYPE,
      (message, sticky) => ({message, sticky, type: 'SUCCESS'}),
    );

    expect(expected).toBe(globalSuccessEventAction);
  });

});
