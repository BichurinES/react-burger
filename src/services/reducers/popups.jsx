import {
  OPEN_INGREDIENT_DETAILS,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  OPEN_ERROR_POPUP,
  CLOSE_ALL_POPUPS,
} from '../actions/popups';

const initialState = {
  isIngredientDetailsOpen: false,
  ingredientDetailsContent: {},
  orderRequest: false,
  isOrderDetailsOpen: false,
  orderDetailsContent: {},
  isErrorPopupOpen: false,
  errorPopupContent: {},
};

export default function popupsReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case OPEN_INGREDIENT_DETAILS: {
      return {
        ...state,
        isIngredientDetailsOpen: true,
        ingredientDetailsContent: payload,
      };
    }
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
    case OPEN_ERROR_POPUP: {
      return {
        ...state,
        isErrorPopupOpen: true,
        errorPopupContent: payload,
      };
    }
    case CLOSE_ALL_POPUPS: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}
