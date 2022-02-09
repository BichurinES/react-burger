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
import { TConstructorActions } from '../actions/burger-constructor';
import { TMainIngredient, TBun } from '../types/data';

export type TBurgerConstructorState = {
  mainIngredients: ReadonlyArray<TMainIngredient>,
  draggingMainIngredients: ReadonlyArray<TMainIngredient>,
  bun: TBun | null,
  totalPrice: number,
};

const initState: TBurgerConstructorState = {
  mainIngredients: [],
  draggingMainIngredients: [],
  bun: null,
  totalPrice: 0,
};

export default function burgerConstructorReducer(state = initState, action: TConstructorActions) {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        mainIngredients: [...state.mainIngredients, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        mainIngredients: state.mainIngredients.filter((ingredient) => (
          ingredient._cartId !== action.payload._cartId
        )),
        totalPrice: state.totalPrice - action.payload.price,
      };
    }
    case REPLACE_BUN_IN_CONSTRUCTOR: {
      return {
        ...state,
        bun: action.payload,
        totalPrice: state.totalPrice
          - (!state.bun ? 0 : 2 * state.bun.price)
          + 2 * action.payload.price,
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
      const { initialIndex, targetIndex } = action.payload;
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
        draggingMainIngredients: [...initState.draggingMainIngredients],
      };
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...initState,
      };
    }
    default: {
      return state;
    }
  }
}
