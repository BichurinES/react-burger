import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  RESET_INGREDIENT_COUNT,
} from '../actions/burger-ingredients';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export default function burgerIngredientsReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
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
        ingredients: payload,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    case INCREASE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient._id === payload._id) {
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
          if (ingredient._id === payload._id) {
            ingredient.qty = !ingredient.qty ? 0 : ingredient.qty - 1;
          }
          return ingredient;
        }),
      };
    }
    case RESET_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient.qty > 0) ingredient.qty = 0;
          return ingredient;
        }),
      };
    }
    default: {
      return state;
    }
  }
}
