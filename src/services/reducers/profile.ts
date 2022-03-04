import {
  UPDATE_TOKEN,
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
} from '../actions/action-types';
import type { TProfileActions } from '../actions/profile';
import { TUser } from '../types/data';
import { defaultAction } from '../actions';

export type TProfilesState = {
  user: TUser | null,
  accessToken: string,
  getUserRequest: boolean,
  getUserFailed: boolean,
  editUserRequest: boolean,
  editUserFailed: boolean,
  logoutRequest: boolean,
  logoutFailed: boolean,
};

export const initialState: TProfilesState = {
  user: null,
  accessToken: '',
  getUserRequest: false,
  getUserFailed: false,
  editUserRequest: false,
  editUserFailed: false,
  logoutRequest: false,
  logoutFailed: false,
};

export default function profileReducer(
  state = initialState,
  action: TProfileActions = defaultAction(),
) {
  switch (action.type) {
    case UPDATE_TOKEN: {
      return {
        ...state,
        accessToken: action.payload,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        user: initialState.user,
        accessToken: initialState.accessToken,
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
        user: action.payload,
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
        user: action.payload,
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
      return state;
    }
  }
}
