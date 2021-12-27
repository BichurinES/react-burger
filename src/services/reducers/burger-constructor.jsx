import uniqid from 'uniqid';
import {
  UPDATE_CONSTRUCTOR_FROM_DRAGGING_CONTAINER,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  REPLACE_BUN_IN_CONSTRUCTOR,
  COPY_CONSTRUCTOR_TO_DRAGGING_CONTAINER,
  REPLACE_ITEMS_IN_DRAGGING_CONTAINER,
  RESET_DRAGGING_CONTAINER,
} from '../actions/burger-constructor';

const initialState = {
  main: [],
  draggingMain: [],
  bun: {},
  totalPrice: 0,
};

export default function burgerConstructorReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case UPDATE_CONSTRUCTOR_FROM_DRAGGING_CONTAINER: {
      return {
        ...state,
        main: [...state.draggingMain],
      };
    }
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      const cartIngredient = { ...payload, _cartId: uniqid() };
      return {
        ...state,
        main: [...state.main, cartIngredient],
        totalPrice: state.totalPrice + cartIngredient.price,
      };
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        main: state.main.filter((ingredient) => (
          ingredient._cartId !== payload._cartId
        )),
        totalPrice: state.totalPrice - payload.price,
      };
    }
    case REPLACE_BUN_IN_CONSTRUCTOR: {
      return {
        ...state,
        bun: payload,
        totalPrice: state.totalPrice
          - (!state.bun.price ? 0 : 2 * state.bun.price)
          + 2 * payload.price,
      };
    }
    case COPY_CONSTRUCTOR_TO_DRAGGING_CONTAINER: {
      return {
        ...state,
        draggingMain: [...state.main],
      };
    }
    case REPLACE_ITEMS_IN_DRAGGING_CONTAINER: {
      const { initialIndex, targetIndex } = payload;
      const newDrraggingMain = [...state.draggingMain];
      newDrraggingMain.splice(targetIndex, 0, ...newDrraggingMain.splice(initialIndex, 1));
      return {
        ...state,
        draggingMain: newDrraggingMain,
      };
    }
    case RESET_DRAGGING_CONTAINER: {
      return {
        ...state,
        draggingMain: [...initialState.draggingMain],
      };
    }
    default: {
      return state;
    }
  }
}
