import uniqid from 'uniqid';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  REPLACE_BUN_IN_CONSTRUCTOR,
} from '../actions/burger-constructor';

const initialState = {
  main: [],
  bun: {},
  totalPrice: 0,
};

export default function burgerConstructorReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
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
    default: {
      return state;
    }
  }
}
