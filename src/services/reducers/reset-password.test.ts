import reducer, { initialState } from './reset-password';
import {
  resetPasswordAction,
  resetPasswordSuccessAction,
  resetPasswordFailedAction,
} from '../actions/reset-password';

describe('reset password reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined)).toEqual(initialState);
  });

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(reducer(undefined, resetPasswordAction())).toEqual({
      ...initialState,
      resetPasswordRequest: true,
    });
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(reducer(undefined, resetPasswordSuccessAction())).toEqual(initialState);
  });

  it('should handle RESET_PASSWORD_FAILED', () => {
    expect(reducer(undefined, resetPasswordFailedAction())).toEqual({
      ...initialState,
      resetPasswordFailed: true,
    });
  });
});
