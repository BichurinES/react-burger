import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from '../actions/action-types';
import { defaultAction } from '../actions';
import type { TForgotPasswordActions } from '../actions/forgot-password';

export type TForgotPasswordState = {
  forgotPasswordRequest: boolean,
  forgotPasswordFailed: boolean,
};

export const initialState: TForgotPasswordState = {
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
};

export default function forgotPasswordReducer(
  state = initialState,
  action: TForgotPasswordActions = defaultAction(),
) {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: true,
      };
    }
    default: {
      return state;
    }
  }
}
