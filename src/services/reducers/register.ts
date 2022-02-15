import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../actions/action-types';
import type { TRegisterActions } from '../actions/register';

export type TRegisterState = {
  registerRequest: boolean,
  registerFailed: boolean,
};

const initState: TRegisterState = {
  registerRequest: false,
  registerFailed: false,
};

export default function registerReducer(state = initState, action: TRegisterActions) {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      };
    }
    default: {
      return state;
    }
  }
}
