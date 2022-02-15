import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../actions/action-types';
import type { TLoginActions } from '../actions/login';

export type TLoginState = {
  loginRequest: boolean,
  loginFailed: boolean,
};

const initState: TLoginState = {
  loginRequest: false,
  loginFailed: false,
};

export default function loginReducer(state = initState, action: TLoginActions) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }
    default: {
      return state;
    }
  }
}
