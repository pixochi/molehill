import { combineReducers } from 'redux';

export interface IRootState {
  test: {};
}

export default combineReducers<IRootState>({
  test: () => 'test',
});