import { loginRequest } from '../norma-api';
import { openErrorPopup } from './popups';
import { setUser } from './profile';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from './action-types';
import useToken from '../token';
import { AppDispatch } from '../store';
import { TLoginForm, TCallback } from '../types';

export const signIn = (form: TLoginForm, cb: TCallback) => (dispatch: AppDispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const { addTokens } = useToken();
  loginRequest(form)
    .then((data) => {
      const { user, accessToken, refreshToken } = data;
      addTokens({ accessToken, refreshToken });
      dispatch(setUser(user));
      dispatch({ type: LOGIN_SUCCESS });
      cb();
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILED });
      dispatch(openErrorPopup(err));
    });
};
