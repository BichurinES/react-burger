import { registerRequest } from '../norma-api';
import { openErrorPopup } from './popups';
import { setUser } from './profile';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from './action-types';
import useToken from '../token';
import { AppDispatch } from '../store';
import { TRegisterForm, TCallback } from '../types';

export const signUp = (form: TRegisterForm, cb: TCallback) => (dispatch: AppDispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  const { addTokens } = useToken();
  registerRequest(form)
    .then((data) => {
      const { user, accessToken, refreshToken } = data;
      addTokens({ accessToken, refreshToken });
      dispatch(setUser(user));
      dispatch({ type: REGISTER_SUCCESS });
      cb();
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAILED });
      dispatch(openErrorPopup(err));
    });
};
