interface IAction {
  type: string;
  payload: any;
}

interface IActionSet {
  action: IAction;
  success: IAction;
  failed: IAction;
  aborted: IAction;
}
