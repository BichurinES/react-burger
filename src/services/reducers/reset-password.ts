import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../actions/action-types';
import type { TResetPasswordActions } from '../actions/reset-password';
import { defaultAction } from '../actions';

export type TResetPasswordState = {
  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,
};

export const initialState: TResetPasswordState = {
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

export default function resetPasswordReducer(
  state = initialState,
  action: TResetPasswordActions = defaultAction(),
) {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      };
    }
    default: {
      return state;
    }
  }
}
