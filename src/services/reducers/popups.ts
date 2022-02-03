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

const initialState: TPopupsState = {
  orderRequest: false,
  isOrderDetailsOpen: false,
  orderDetailsContent: null,
  isErrorPopupOpen: false,
  errorPopupContent: null,
  isSuccessPopupOpen: false,
  successPopupContent: null,
};

export default function popupsReducer(state = initialState, action: any = {}) {
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
        isOrderDetailsOpen: initialState.isOrderDetailsOpen,
        orderDetailsContent: initialState.orderDetailsContent,
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
        isErrorPopupOpen: initialState.isErrorPopupOpen,
        errorPopupContent: initialState.errorPopupContent,
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
        isSuccessPopupOpen: initialState.isSuccessPopupOpen,
        successPopupContent: initialState.successPopupContent,
      };
    }
    default: {
      return state;
    }
  }
}
