import { loginRequest } from '../norma-api';
import { openErrorPopup } from './popups';
import { setUser } from './profile';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../../utils/action-types';
import useToken from '../token';

export const signIn = (form) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const { addTokens } = useToken();
  return loginRequest(form)
    .then((data) => {
      const { user, accessToken, refreshToken } = data;
      addTokens({ accessToken, refreshToken });
      dispatch(setUser(user));
      dispatch({ type: LOGIN_SUCCESS });
      return data;
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILED });
      dispatch(openErrorPopup(err));
    });
};
