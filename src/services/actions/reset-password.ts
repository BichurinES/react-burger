import { resetPasswordRequest } from '../norma-api';
import { openErrorPopup, openSuccessPopup } from './popups';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from './action-types';
import { AppDispatch } from '../store';
import { TCallback, TResetPasswordForm } from '../types';

export const resetPassword = (
  (form: TResetPasswordForm, cb: TCallback) => (dispatch: AppDispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    resetPasswordRequest(form)
      .then((data) => {
        dispatch({ type: RESET_PASSWORD_SUCCESS });
        dispatch(openSuccessPopup(data));
        cb();
      })
      .catch((err) => {
        dispatch({ type: RESET_PASSWORD_FAILED });
        dispatch(openErrorPopup(err));
      });
  });
