import { getUserRequest, editUserRequest, logoutRequest } from '../norma-api';
import { openErrorPopup } from './popups';
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

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const getUser = () => (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  const { getToken } = useToken();
  return getToken()
    .then((token) => getUserRequest(token))
    .then(({ user }) => {
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      return user;
    })
    .catch((err) => {
      dispatch({ type: GET_USER_FAILED });
      dispatch(openErrorPopup(err));
    });
};

export const editUser = (form) => (dispatch) => {
  dispatch({ type: EDIT_USER_REQUEST });
  const { getToken } = useToken();
  return getToken()
    .then((token) => editUserRequest(form, token))
    .then(({ user }) => {
      dispatch({ type: EDIT_USER_SUCCESS, payload: user });
      return user;
    })
    .catch((err) => {
      dispatch({ type: EDIT_USER_FAILED });
      dispatch(openErrorPopup(err));
    });
};

export const signOut = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  const { refreshToken, clearAllTokens } = useToken();
  return logoutRequest({ token: refreshToken })
    .then((data) => {
      clearAllTokens();
      dispatch(clearUser());
      dispatch({ type: LOGOUT_SUCCESS });
      return data;
    })
    .catch((err) => {
      dispatch({ type: LOGOUT_FAILED });
      dispatch(openErrorPopup(err));
    });
};
