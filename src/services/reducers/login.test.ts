import reducer, { initialState } from './login';
import {
  loginAction,
  loginSuccessAction,
  loginFailedAction,
} from '../actions/login';

describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined)).toEqual(initialState);
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(reducer(undefined, loginAction())).toEqual({
      ...initialState,
      loginRequest: true,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(reducer(undefined, loginSuccessAction())).toEqual(initialState);
  });

  it('should handle LOGIN_FAILED', () => {
    expect(reducer(undefined, loginFailedAction())).toEqual({
      ...initialState,
      loginFailed: true,
    });
  });
});
