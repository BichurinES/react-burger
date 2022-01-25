import Cookies from 'js-cookie';
import { forgotPasswordRequest } from '../norma-api';
import { openErrorPopup, openSuccessPopup } from './popups';
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from './action-types';
import useToken from '../token';

export const sendResetEmail = () => (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  const { refreshToken } = useToken();

  return forgotPasswordRequest({ token: refreshToken })
    .then((data) => {
      dispatch({ type: FORGOT_PASSWORD_SUCCESS });
      dispatch(openSuccessPopup(data));
      Cookies.set('passwordResetAccess', 'true', { expires: 1 / 24 / 12 });
      return data;
    })
    .catch((err) => {
      dispatch({ type: FORGOT_PASSWORD_FAILED });
      dispatch(openErrorPopup(err));
    });
};
