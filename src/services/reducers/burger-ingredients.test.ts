import { TEST_MAIN_INGREDIENT, TEST_SAUCE_INGREDIENT } from '../../utils/constants';
import {
  getIngredientsAction,
  getIngredientsSuccessAction,
  getIngredientsFailedAction,
  increaseIngredientAction,
  decreaseIngredientAction,
  resetIngredientCountAction,
} from '../actions/burger-ingredients';
import reducer, { initialState } from './burger-ingredients';

describe('burger ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined)).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(reducer(undefined, getIngredientsAction())).toEqual({
      ...initialState,
      ingredientsRequest: true,
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(reducer(undefined, getIngredientsSuccessAction([TEST_MAIN_INGREDIENT]))).toEqual({
      ...initialState,
      ingredients: [TEST_MAIN_INGREDIENT],
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(reducer(undefined, getIngredientsFailedAction())).toEqual({
      ...initialState,
      ingredientsFailed: true,
    });
  });

  it('should handle INCREASE_INGREDIENT', () => {
    expect(reducer({
      ...initialState,
      ingredients: [TEST_MAIN_INGREDIENT, TEST_SAUCE_INGREDIENT],
    }, increaseIngredientAction({ _id: TEST_MAIN_INGREDIENT._id }))).toEqual({
      ...initialState,
      ingredients: [{ ...TEST_MAIN_INGREDIENT, qty: 1 }, TEST_SAUCE_INGREDIENT],
    });
  });

  it('should handle DECREASE_INGREDIENT', () => {
    expect(reducer({
      ...initialState,
      ingredients: [{ ...TEST_MAIN_INGREDIENT, qty: 2 }, TEST_SAUCE_INGREDIENT],
    }, decreaseIngredientAction({ _id: TEST_MAIN_INGREDIENT._id }))).toEqual({
      ...initialState,
      ingredients: [{ ...TEST_MAIN_INGREDIENT, qty: 1 }, TEST_SAUCE_INGREDIENT],
    });
    expect(reducer({
      ...initialState,
      ingredients: [{ ...TEST_MAIN_INGREDIENT, qty: 1 }, TEST_SAUCE_INGREDIENT],
    }, decreaseIngredientAction({ _id: TEST_SAUCE_INGREDIENT._id }))).toEqual({
      ...initialState,
      ingredients: [{ ...TEST_MAIN_INGREDIENT, qty: 1 }, { ...TEST_SAUCE_INGREDIENT, qty: 0 }],
    });
  });

  it('should handle RESET_INGREDIENTS_COUNT', () => {
    expect(reducer({
      ...initialState,
      ingredients: [{ ...TEST_MAIN_INGREDIENT, qty: 1 }, TEST_SAUCE_INGREDIENT],
    }, resetIngredientCountAction())).toEqual({
      ...initialState,
      ingredients: [{ ...TEST_MAIN_INGREDIENT, qty: 0 }, TEST_SAUCE_INGREDIENT],
    });
  });
});
