import Cookies from 'js-cookie';
import { forgotPasswordRequest } from '../norma-api';
import { openErrorPopupAction, openSuccessPopupAction } from './popups';
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from './action-types';
import { AppDispatch } from '../store';
import { TForgotPasswordForm, TCallback } from '../types';

export interface IForgotPasswordAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export type TForgotPasswordActions =
  | IForgotPasswordAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction;

export const forgotPasswordAction = (): IForgotPasswordAction => ({
  type: FORGOT_PASSWORD_REQUEST,
});

export const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailedAction = (): IForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED,
});

export const sendResetEmail = (
  (form: TForgotPasswordForm, cb: TCallback) => (dispatch: AppDispatch) => {
    dispatch(forgotPasswordAction());

    return forgotPasswordRequest(form)
      .then((data) => {
        dispatch(forgotPasswordSuccessAction());
        dispatch(openSuccessPopupAction(data));
        Cookies.set('passwordResetAccess', 'true', { expires: 1 / 24 / 12 });
        cb();
      })
      .catch((err) => {
        dispatch(forgotPasswordFailedAction());
        dispatch(openErrorPopupAction(err));
      });
  });
