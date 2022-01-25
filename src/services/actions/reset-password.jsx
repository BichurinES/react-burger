import { resetPasswordRequest } from '../norma-api';
import { openErrorPopup, openSuccessPopup } from './popups';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from './action-types';

export const resetPassword = (form) => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  return resetPasswordRequest(form)
    .then((data) => {
      dispatch({ type: RESET_PASSWORD_SUCCESS });
      dispatch(openSuccessPopup(data));
      return data;
    })
    .catch((err) => {
      dispatch({ type: RESET_PASSWORD_FAILED });
      dispatch(openErrorPopup(err));
      return err;
    });
};
