import { getUserRequest, editUserRequest, logoutRequest } from '../norma-api';
import { OPEN_ERROR_POPUP } from './popups';
import useToken from '../token';

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const getUser = () => (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  const { getToken } = useToken();
  getToken()
    .then((token) => getUserRequest(token))
    .then((data) => {
      dispatch({ type: GET_USER_SUCCESS, payload: data.user });
    })
    .catch((err) => {
      dispatch({ type: GET_USER_FAILED });
      dispatch({
        type: OPEN_ERROR_POPUP,
        payload: err,
      });
    });
};

export const editUser = (form) => (dispatch) => {
  dispatch({ type: EDIT_USER_REQUEST });
  const { getToken } = useToken();
  getToken()
    .then((token) => editUserRequest(form, token))
    .then((data) => {
      dispatch({ type: EDIT_USER_SUCCESS, payload: data.user });
    })
    .catch((err) => {
      dispatch({ type: EDIT_USER_FAILED });
      dispatch({
        type: OPEN_ERROR_POPUP,
        payload: err,
      });
    });
};

export const signOut = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  const { refreshToken, clearAllTokens } = useToken();
  return logoutRequest({ token: refreshToken })
    .then((data) => {
      clearAllTokens();
      dispatch({ type: CLEAR_USER });
      dispatch({ type: LOGOUT_SUCCESS });
      return data;
    })
    .catch((err) => {
      dispatch({ type: LOGOUT_FAILED });
      dispatch({
        type: OPEN_ERROR_POPUP,
        payload: err,
      });
    });
};
