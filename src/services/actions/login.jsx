import { loginRequest } from '../norma-api';
import { OPEN_ERROR_POPUP } from './popups';
import { SET_USER } from './profile';
import useToken from '../token';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const signIn = (form) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const { addTokens } = useToken();
  return loginRequest(form)
    .then((data) => {
      const { user, accessToken, refreshToken } = data;
      addTokens({ accessToken, refreshToken });
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: LOGIN_SUCCESS });
      return data;
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILED });
      dispatch({
        type: OPEN_ERROR_POPUP,
        payload: err,
      });
    });
};
