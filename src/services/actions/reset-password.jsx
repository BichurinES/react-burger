import Cookies from 'js-cookie';
import { resetPasswordRequest } from '../norma-api';
import { OPEN_ERROR_POPUP, OPEN_SUCCESS_POPUP } from './popups';

export const RESET_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const resetPassword = (form) => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  return resetPasswordRequest(form)
    .then((data) => {
      dispatch({ type: RESET_PASSWORD_SUCCESS });
      dispatch({
        type: OPEN_SUCCESS_POPUP,
        payload: data,
      });
      Cookies.remove('passwordResetAccess');
      return data;
    })
    .catch((err) => {
      dispatch({ type: RESET_PASSWORD_FAILED });
      dispatch({
        type: OPEN_ERROR_POPUP,
        payload: err,
      });
      return err;
    });
};
