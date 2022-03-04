import { DEFAULT } from './action-types';

export interface IDefaultAction {
  readonly type: typeof DEFAULT;
}

// Action for test reducers initial state
export const defaultAction = (): IDefaultAction => ({ type: DEFAULT });
