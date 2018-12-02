import store from 'app/redux/store';

export interface IReduxAction<T = any> {
  type: string;
  payload: T;
}

interface IAction<T = {}> {
  action: (...args: T[]) => IReduxAction<T>;
  type: string;
  dispatch: (...args: T[]) => void;
}

interface IActionSet {
  action: IAction;
  success: IAction;
  failed: IAction;
  aborted: IAction;
}

type ActionArgsMapper = (...actionArgs: any[]) => any;

type CreateActions = (
  actionType: string,
  actionMapper: ActionArgsMapper,
  successMapper?: ActionArgsMapper,
  failedMapper?: ActionArgsMapper,
  abortedMapper?: ActionArgsMapper,
) => IActionSet;

type CreateAction = (type: string, mapper?: ActionArgsMapper) => IAction;

const createAction: CreateAction = (type, mapper) => {

  const getActionPayload = (...args: any) => mapper ? mapper(...args) : args;
  const getActionContent = (...args: any) => ({
    payload: getActionPayload(...args),
    type,
  });

  return {
    action: (...args) => getActionContent(...args),
    dispatch: (...args) => store.dispatch(getActionContent(...args)),
    type,
  };
};

export const createActions: CreateActions = (
  actionType: string,
  actionMapper: ActionArgsMapper,
  successMapper?: ActionArgsMapper,
  failedMapper?: ActionArgsMapper,
  abortedMapper?: ActionArgsMapper,
): IActionSet => {
  return {
    action: createAction(`${actionType}`, actionMapper),
    success: createAction(`${actionType}_SUCCESS`, successMapper),
    failed: createAction(`${actionType}_FAILED`, failedMapper),
    aborted: createAction(`${actionType}_ABORTED`, abortedMapper),
  };
};

export const getCreateActions = () => createActions;
