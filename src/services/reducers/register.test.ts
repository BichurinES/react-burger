import reducer, { initialState } from './register';
import {
  registerAction,
  registerSuccessAction,
  registerFailedAction,
} from '../actions/register';

describe('register reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined)).toEqual(initialState);
  });

  it('should handle REGISTER_REQUEST', () => {
    expect(reducer(undefined, registerAction())).toEqual({
      ...initialState,
      registerRequest: true,
    });
  });

  it('should handle REGISTER_SUCCESS', () => {
    expect(reducer(undefined, registerSuccessAction())).toEqual(initialState);
  });

  it('should handle REGISTER_FAILED', () => {
    expect(reducer(undefined, registerFailedAction())).toEqual({
      ...initialState,
      registerFailed: true,
    });
  });
});
