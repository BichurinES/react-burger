import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  CLOSE_ORDER_DETAILS,
  OPEN_ERROR_POPUP,
  CLOSE_ERROR_POPUP,
  OPEN_SUCCESS_POPUP,
  CLOSE_SUCCESS_POPUP,
} from '../../utils/action-types';

const initialState = {
  orderRequest: false,
  isOrderDetailsOpen: false,
  orderDetailsContent: {},
  isErrorPopupOpen: false,
  errorPopupContent: {},
  isSuccessPopupOpen: false,
  successPopupContent: {},
};

export default function popupsReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
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
        orderDetailsContent: payload,
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
        errorPopupContent: payload,
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
        successPopupContent: payload,
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
