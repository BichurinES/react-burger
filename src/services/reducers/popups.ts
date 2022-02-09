import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  CLOSE_ORDER_DETAILS,
  OPEN_ERROR_POPUP,
  CLOSE_ERROR_POPUP,
  OPEN_SUCCESS_POPUP,
  CLOSE_SUCCESS_POPUP,
} from '../actions/action-types';
import type { TPopupActions } from '../actions/popups';
import { TOrderDetails, TInfoTooltip } from '../types/data';

export type TPopupsState = {
  orderRequest: boolean,
  isOrderDetailsOpen: boolean,
  orderDetailsContent: TOrderDetails | null,
  isErrorPopupOpen: boolean,
  errorPopupContent: TInfoTooltip | null,
  isSuccessPopupOpen: boolean,
  successPopupContent: TInfoTooltip | null,
};

const initState: TPopupsState = {
  orderRequest: false,
  isOrderDetailsOpen: false,
  orderDetailsContent: null,
  isErrorPopupOpen: false,
  errorPopupContent: null,
  isSuccessPopupOpen: false,
  successPopupContent: null,
};

export default function popupsReducer(state = initState, action: TPopupActions) {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        isOrderDetailsOpen: true,
        orderDetailsContent: action.payload,
      };
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderRequest: false,
      };
    }
    case CLOSE_ORDER_DETAILS: {
      return {
        ...state,
        isOrderDetailsOpen: initState.isOrderDetailsOpen,
        orderDetailsContent: initState.orderDetailsContent,
      };
    }
    case OPEN_ERROR_POPUP: {
      return {
        ...state,
        isErrorPopupOpen: true,
        errorPopupContent: action.payload,
      };
    }
    case CLOSE_ERROR_POPUP: {
      return {
        ...state,
        isErrorPopupOpen: initState.isErrorPopupOpen,
        errorPopupContent: initState.errorPopupContent,
      };
    }
    case OPEN_SUCCESS_POPUP: {
      return {
        ...state,
        isSuccessPopupOpen: true,
        successPopupContent: action.payload,
      };
    }
    case CLOSE_SUCCESS_POPUP: {
      return {
        ...state,
        isSuccessPopupOpen: initState.isSuccessPopupOpen,
        successPopupContent: initState.successPopupContent,
      };
    }
    default: {
      return state;
    }
  }
}
