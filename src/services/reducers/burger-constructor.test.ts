import reducer, { initialState } from './burger-constructor';
import {
  addIngredientAction,
  copyConstructorToDraggingContainerAction,
  removeIngredientAction,
  replaceBunAction,
  replaceItemsInDraggingContainerAction,
  resetConstructorAction,
  resetDraggingContainerAction,
  updateConstructorFromDraggingContainerAction,
} from '../actions/burger-constructor';
import {
  TEST_MAIN_INGREDIENT,
  TEST_SAUCE_INGREDIENT,
  TEST_BUN,
} from '../../utils/constants';
import { TMainIngredient } from '../types/data';

describe('burger constructor reducer', () => {
  const mainIngredient: TMainIngredient = { ...TEST_MAIN_INGREDIENT, _cartId: '1', type: 'main' };
  const sauceIngredient: TMainIngredient = { ...TEST_SAUCE_INGREDIENT, _cartId: '1', type: 'sauce' };

  it('should return the initial state', () => {
    expect(reducer(undefined)).toEqual(initialState);
  });

  it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR', () => {
    const addAction = addIngredientAction(TEST_MAIN_INGREDIENT);
    expect(reducer(undefined, addAction)).toEqual({
      ...initialState,
      mainIngredients: [addAction.payload],
      totalPrice: addAction.payload.price,
    });
    expect(reducer({
      ...initialState,
      mainIngredients: [addAction.payload],
      totalPrice: addAction.payload.price,
    }, addAction)).toEqual({
      ...initialState,
      mainIngredients: [addAction.payload, addAction.payload],
      totalPrice: addAction.payload.price * 2,
    });
  });

  it('should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR', () => {
    expect(reducer({
      ...initialState,
      mainIngredients: [{ ...TEST_MAIN_INGREDIENT, _cartId: '1', type: 'main' }],
      totalPrice: TEST_MAIN_INGREDIENT.price,
    }, removeIngredientAction({ _cartId: '1', price: TEST_MAIN_INGREDIENT.price }))).toEqual(initialState);
  });

  it('should handle REPLACE_BUN_IN_CONSTRUCTOR', () => {
    expect(reducer(undefined, replaceBunAction(TEST_BUN))).toEqual({
      ...initialState,
      bun: TEST_BUN,
      totalPrice: TEST_BUN.price * 2,
    });
  });

  it('should handle UPDATE_CONSTRUCTOR_FROM_DRAGGING_CONTAINER', () => {
    expect(reducer({
      ...initialState,
      mainIngredients: [mainIngredient],
      draggingMainIngredients: [mainIngredient, mainIngredient],
    }, updateConstructorFromDraggingContainerAction())).toEqual({
      ...initialState,
      mainIngredients: [mainIngredient, mainIngredient],
      draggingMainIngredients: [mainIngredient, mainIngredient],
    });
  });

  it('should handle COPY_CONSTRUCTOR_TO_DRAGGING_CONTAINER', () => {
    expect(reducer({
      ...initialState,
      mainIngredients: [mainIngredient],
    }, copyConstructorToDraggingContainerAction())).toEqual({
      ...initialState,
      mainIngredients: [mainIngredient],
      draggingMainIngredients: [mainIngredient],
    });
  });

  it('should handle REPLACE_ITEMS_IN_DRAGGING_CONTAINER', () => {
    expect(reducer({
      ...initialState,
      draggingMainIngredients: [mainIngredient, sauceIngredient],
    }, replaceItemsInDraggingContainerAction({ initialIndex: 1, targetIndex: 0 }))).toEqual({
      ...initialState,
      draggingMainIngredients: [sauceIngredient, mainIngredient],
    });
  });

  it('should handle RESET_DRAGGING_CONTAINER', () => {
    expect(reducer({
      ...initialState,
      mainIngredients: [mainIngredient],
      draggingMainIngredients: [mainIngredient, mainIngredient],
    }, resetDraggingContainerAction())).toEqual({
      ...initialState,
      mainIngredients: [mainIngredient],
      draggingMainIngredients: [],
    });
  });

  it('should handle RESET_CONSTRUCTOR', () => {
    expect(reducer({
      ...initialState,
      mainIngredients: [mainIngredient],
      draggingMainIngredients: [mainIngredient, mainIngredient],
    }, resetConstructorAction())).toEqual(initialState);
  });
});
