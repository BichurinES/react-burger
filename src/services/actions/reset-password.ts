import { resetPasswordRequest } from '../norma-api';
import { openErrorPopupAction, openSuccessPopupAction } from './popups';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from './action-types';
import { AppDispatch } from '../store';
import { TCallback, TResetPasswordForm } from '../types';

export interface IResetPasswordAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TResetPasswordActions =
  | IResetPasswordAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction;

export const resetPasswordAction = (): IResetPasswordAction => ({
  type: RESET_PASSWORD_REQUEST,
});

export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
  type: RESET_PASSWORD_FAILED,
});

export const resetPassword = (
  (form: TResetPasswordForm, cb: TCallback) => (dispatch: AppDispatch) => {
    dispatch(resetPasswordAction());
    resetPasswordRequest(form)
      .then((data) => {
        dispatch(resetPasswordSuccessAction());
        dispatch(openSuccessPopupAction(data));
        cb();
      })
      .catch((err) => {
        dispatch(resetPasswordFailedAction());
        dispatch(openErrorPopupAction(err));
      });
  });
