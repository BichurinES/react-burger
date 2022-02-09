import { getUserRequest, editUserRequest, logoutRequest } from '../norma-api';
import { openErrorPopupAction } from './popups';
import { TOKEN_ERR_MSG } from '../../utils/constants';
import {
  SET_USER,
  CLEAR_USER,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from './action-types';
import useToken from '../token';
import { TUser } from '../types/data';
import { AppDispatch } from '../store';
import { TProfileForm, TCallback } from '../types';

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: TUser;
}

export interface IClearUserAction {
  readonly type: typeof CLEAR_USER;
}

export interface IGetUserAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUser;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IEditUserAction {
  readonly type: typeof EDIT_USER_REQUEST;
}

export interface IEditUserSuccessAction {
  readonly type: typeof EDIT_USER_SUCCESS;
  readonly payload: TUser;
}

export interface IEditUserFailedAction {
  readonly type: typeof EDIT_USER_FAILED;
}

export interface ILogoutAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export type TProfileActions =
  | ISetUserAction
  | IClearUserAction
  | IGetUserAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IEditUserAction
  | IEditUserSuccessAction
  | IEditUserFailedAction
  | ILogoutAction
  | ILogoutSuccessAction
  | ILogoutFailedAction;

export const setUserAction = (user: TUser): ISetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const clearUserAction = (): IClearUserAction => ({
  type: CLEAR_USER,
});

export const getUserAction = (): IGetUserAction => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccessAction = (user: TUser): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const getUserFailedAction = (): IGetUserFailedAction => ({
  type: GET_USER_FAILED,
});

export const editUserAction = (): IEditUserAction => ({
  type: EDIT_USER_REQUEST,
});

export const editUserSuccessAction = (user: TUser): IEditUserSuccessAction => ({
  type: EDIT_USER_SUCCESS,
  payload: user,
});

export const editUserFailedAction = (): IEditUserFailedAction => ({
  type: EDIT_USER_FAILED,
});

export const logoutAction = (): ILogoutAction => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_FAILED,
});

export const getUser = () => (dispatch: AppDispatch) => {
  dispatch(getUserAction());
  const { getToken } = useToken();
  return getToken()
    .then((token) => {
      if (token) {
        return getUserRequest(token);
      }
      throw new Error(TOKEN_ERR_MSG);
    })
    .then(({ user }) => {
      dispatch(getUserSuccessAction(user));
      return user;
    })
    .catch((err) => {
      dispatch(getUserFailedAction());
      dispatch(openErrorPopupAction(err));
    });
};

export const editUser = (form: TProfileForm) => (dispatch: AppDispatch) => {
  dispatch(editUserAction());
  const { getToken } = useToken();
  getToken()
    .then((token) => {
      if (token) {
        return editUserRequest(form, token);
      }
      throw new Error(TOKEN_ERR_MSG);
    })
    .then(({ user }) => {
      dispatch(editUserSuccessAction(user));
    })
    .catch((err) => {
      dispatch(editUserFailedAction());
      dispatch(openErrorPopupAction(err));
    });
};

export const signOut = (cb: TCallback) => (dispatch: AppDispatch) => {
  dispatch(logoutAction());
  const { refreshToken, clearAllTokens } = useToken();
  logoutRequest({ token: refreshToken })
    .then(() => {
      clearAllTokens();
      dispatch(clearUserAction());
      dispatch(logoutSuccessAction());
      cb();
    })
    .catch((err) => {
      dispatch(logoutFailedAction());
      dispatch(openErrorPopupAction(err));
    });
};
