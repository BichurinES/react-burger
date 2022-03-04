import { registerRequest } from '../norma-api';
import { openErrorPopupAction } from './popups';
import { setUserAction, updateTokenAction } from './profile';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from './action-types';
import useToken from '../token';
import { IDefaultAction } from '.';
import { AppThunk } from '../store';
import { TRegisterForm, TCallback } from '../types';

export interface IRegisterAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export type TRegisterActions =
  | IDefaultAction
  | IRegisterAction
  | IRegisterSuccessAction
  | IRegisterFailedAction;

export const registerAction = (): IRegisterAction => ({
  type: REGISTER_REQUEST,
});

export const registerSuccessAction = (): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
});

export const registerFailedAction = (): IRegisterFailedAction => ({
  type: REGISTER_FAILED,
});

export const signUp: AppThunk = (form: TRegisterForm, cb: TCallback) => (dispatch) => {
  dispatch(registerAction());
  const { addTokens } = useToken();
  registerRequest(form)
    .then((data) => {
      const { user, accessToken, refreshToken } = data;
      addTokens({ accessToken, refreshToken });
      dispatch(setUserAction(user));
      dispatch(updateTokenAction(accessToken.split('Bearer ')[1]));
      dispatch(registerSuccessAction());
      cb();
    })
    .catch((err) => {
      dispatch(registerFailedAction());
      dispatch(openErrorPopupAction(err));
    });
};
