import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  RESET_INGREDIENTS_COUNT,
} from '../actions/action-types';
import type { TIngredientsActions } from '../actions/burger-ingredients';
import { TIngredient } from '../types/data';
import { defaultAction } from '../actions';

export type TBurgerIngredientsState = {
  ingredients: ReadonlyArray<TIngredient>,
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
};

export const initialState: TBurgerIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export default function burgerIngredientsReducer(
  state = initialState,
  action: TIngredientsActions = defaultAction(),
) {
  switch (action.type) {
    case INCREASE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient._id === action.payload._id) {
            ingredient.qty = !ingredient.qty ? 1 : ingredient.qty + 1;
          }
          return ingredient;
        }),
      };
    }
    case DECREASE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient._id === action.payload._id) {
            ingredient.qty = !ingredient.qty ? 0 : ingredient.qty - 1;
          }
          return ingredient;
        }),
      };
    }
    case RESET_INGREDIENTS_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient.qty) ingredient.qty = 0;
          return ingredient;
        }),
      };
    }
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.payload,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
}
