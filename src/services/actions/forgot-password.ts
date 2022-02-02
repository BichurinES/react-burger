import Cookies from 'js-cookie';
import { forgotPasswordRequest } from '../norma-api';
import { openErrorPopup, openSuccessPopup } from './popups';
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from './action-types';
import { AppDispatch } from '../store';
import { TForgotPasswordForm, TCallback } from '../types';

export const sendResetEmail = (
  (form: TForgotPasswordForm, cb: TCallback) => (dispatch: AppDispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    return forgotPasswordRequest(form)
      .then((data) => {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        dispatch(openSuccessPopup(data));
        Cookies.set('passwordResetAccess', 'true', { expires: 1 / 24 / 12 });
        cb();
      })
      .catch((err) => {
        dispatch({ type: FORGOT_PASSWORD_FAILED });
        dispatch(openErrorPopup(err));
      });
  });
