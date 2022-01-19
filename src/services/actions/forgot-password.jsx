import Cookies from 'js-cookie';
import { forgotPasswordRequest } from '../norma-api';
import { OPEN_ERROR_POPUP, OPEN_SUCCESS_POPUP } from './popups';
import useToken from '../token';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const sendResetEmail = () => (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  const { refreshToken } = useToken();

  return forgotPasswordRequest({ token: refreshToken })
    .then((data) => {
      dispatch({ type: FORGOT_PASSWORD_SUCCESS });
      dispatch({
        type: OPEN_SUCCESS_POPUP,
        payload: data,
      });
      Cookies.set('passwordResetAccess', 'true', { expires: 1 / 24 / 12 });
      return data;
    })
    .catch((err) => {
      dispatch({ type: FORGOT_PASSWORD_FAILED });
      dispatch({
        type: OPEN_ERROR_POPUP,
        payload: err,
      });
    });
};
