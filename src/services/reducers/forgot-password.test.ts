import reducer, { initialState } from './forgot-password';
import {
  forgotPasswordAction,
  forgotPasswordSuccessAction,
  forgotPasswordFailedAction,
} from '../actions/forgot-password';

describe('forgot password reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined)).toEqual(initialState);
  });

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(reducer(undefined, forgotPasswordAction())).toEqual({
      ...initialState,
      forgotPasswordRequest: true,
    });
  });

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(reducer(undefined, forgotPasswordSuccessAction())).toEqual(initialState);
  });

  it('should handle FORGOT_PASSWORD_FAILED', () => {
    expect(reducer(undefined, forgotPasswordFailedAction())).toEqual({
      ...initialState,
      forgotPasswordFailed: true,
    });
  });
});
