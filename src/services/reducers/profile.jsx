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
} from '../actions/profile';

const initialState = {
  user: {},
  getUserRequest: false,
  getUserFailed: false,
  editUserRequest: false,
  editUserFailed: false,
  logoutRequest: false,
  logoutFailed: false,
};

export default function profileReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case SET_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        user: initialState.user,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        user: payload,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
      };
    }
    case EDIT_USER_REQUEST: {
      return {
        ...state,
        editUserRequest: true,
        editUserFailed: false,
      };
    }
    case EDIT_USER_SUCCESS: {
      return {
        ...state,
        editUserRequest: false,
        user: payload,
      };
    }
    case EDIT_USER_FAILED: {
      return {
        ...state,
        editUserRequest: false,
        editUserFailed: true,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      };
    }
    default: {
      return { ...state };
    }
  }
}
