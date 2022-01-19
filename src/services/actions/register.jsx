import { registerRequest } from '../norma-api';
import { OPEN_ERROR_POPUP } from './popups';
import { SET_USER } from './profile';
import useToken from '../token';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const signUp = (form) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  const { addTokens } = useToken();
  return registerRequest(form)
    .then((data) => {
      const { user, accessToken, refreshToken } = data;
      addTokens({ accessToken, refreshToken });
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: REGISTER_SUCCESS });
      return data;
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAILED });
      dispatch({
        type: OPEN_ERROR_POPUP,
        payload: err,
      });
    });
};
