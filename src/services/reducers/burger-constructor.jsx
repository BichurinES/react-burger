import {
  UPDATE_CONSTRUCTOR_FROM_DRAGGING_CONTAINER,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  REPLACE_BUN_IN_CONSTRUCTOR,
  COPY_CONSTRUCTOR_TO_DRAGGING_CONTAINER,
  REPLACE_ITEMS_IN_DRAGGING_CONTAINER,
  RESET_DRAGGING_CONTAINER,
  RESET_CONSTRUCTOR,
} from '../actions/action-types';

const initialState = {
  mainIngredients: [],
  draggingMainIngredients: [],
  bun: {},
  totalPrice: 0,
};

export default function burgerConstructorReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        mainIngredients: [...state.mainIngredients, payload],
        totalPrice: state.totalPrice + payload.price,
      };
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        mainIngredients: state.mainIngredients.filter((ingredient) => (
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
    case UPDATE_CONSTRUCTOR_FROM_DRAGGING_CONTAINER: {
      return {
        ...state,
        mainIngredients: [...state.draggingMainIngredients],
      };
    }
    case COPY_CONSTRUCTOR_TO_DRAGGING_CONTAINER: {
      return {
        ...state,
        draggingMainIngredients: [...state.mainIngredients],
      };
    }
    case REPLACE_ITEMS_IN_DRAGGING_CONTAINER: {
      const { initialIndex, targetIndex } = payload;
      const newDrraggingMain = [...state.draggingMainIngredients];
      newDrraggingMain.splice(targetIndex, 0, ...newDrraggingMain.splice(initialIndex, 1));
      return {
        ...state,
        draggingMainIngredients: newDrraggingMain,
      };
    }
    case RESET_DRAGGING_CONTAINER: {
      return {
        ...state,
        draggingMainIngredients: [...initialState.draggingMainIngredients],
      };
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
}
