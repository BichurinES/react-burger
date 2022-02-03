import { getUserRequest, editUserRequest, logoutRequest } from '../norma-api';
import { openErrorPopup } from './popups';
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

export const setUser = (user: TUser) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const getUser = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  const { getToken } = useToken();
  return getToken()
    .then((token) => {
      if (token) {
        return getUserRequest(token);
      }
      throw new Error(TOKEN_ERR_MSG);
    })
    .then(({ user }) => {
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      return user;
    })
    .catch((err) => {
      dispatch({ type: GET_USER_FAILED });
      dispatch(openErrorPopup(err));
    });
};

export const editUser = (form: TProfileForm) => (dispatch: AppDispatch) => {
  dispatch({ type: EDIT_USER_REQUEST });
  const { getToken } = useToken();
  getToken()
    .then((token) => {
      if (token) {
        return editUserRequest(form, token);
      }
      throw new Error(TOKEN_ERR_MSG);
    })
    .then(({ user }) => {
      dispatch({ type: EDIT_USER_SUCCESS, payload: user });
    })
    .catch((err) => {
      dispatch({ type: EDIT_USER_FAILED });
      dispatch(openErrorPopup(err));
    });
};

export const signOut = (cb: TCallback) => (dispatch: AppDispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  const { refreshToken, clearAllTokens } = useToken();
  logoutRequest({ token: refreshToken })
    .then(() => {
      clearAllTokens();
      dispatch(clearUser());
      dispatch({ type: LOGOUT_SUCCESS });
      cb();
    })
    .catch((err) => {
      dispatch({ type: LOGOUT_FAILED });
      dispatch(openErrorPopup(err));
    });
};
