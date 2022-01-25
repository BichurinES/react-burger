import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../actions/action-types';

const initialState = {
  loginRequest: false,
  loginFailed: false,
};

export default function loginReducer(state = initialState, { type } = {}) {
  switch (type) {
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
