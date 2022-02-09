import { loginRequest } from '../norma-api';
import { openErrorPopupAction } from './popups';
import { setUserAction } from './profile';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from './action-types';
import useToken from '../token';
import { AppDispatch } from '../store';
import { TLoginForm, TCallback } from '../types';

export interface ILoginAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export type TLoginActions =
  | ILoginAction
  | ILoginSuccessAction
  | ILoginFailedAction;

export const loginAction = (): ILoginAction => ({
  type: LOGIN_REQUEST,
});

export const loginSuccessAction = (): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
});

export const loginFailedAction = (): ILoginFailedAction => ({
  type: LOGIN_FAILED,
});

export const signIn = (form: TLoginForm, cb: TCallback) => (dispatch: AppDispatch) => {
  dispatch(loginAction());
  const { addTokens } = useToken();
  loginRequest(form)
    .then((data) => {
      const { user, accessToken, refreshToken } = data;
      addTokens({ accessToken, refreshToken });
      dispatch(setUserAction(user));
      dispatch(loginSuccessAction());
      cb();
    })
    .catch((err) => {
      dispatch(loginFailedAction());
      dispatch(openErrorPopupAction(err));
    });
};
