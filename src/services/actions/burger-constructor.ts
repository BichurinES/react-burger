import uniqid from 'uniqid';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  REPLACE_BUN_IN_CONSTRUCTOR,
  UPDATE_CONSTRUCTOR_FROM_DRAGGING_CONTAINER,
  COPY_CONSTRUCTOR_TO_DRAGGING_CONTAINER,
  REPLACE_ITEMS_IN_DRAGGING_CONTAINER,
  RESET_DRAGGING_CONTAINER,
  RESET_CONSTRUCTOR,
} from './action-types';
import { TIngredient, TMainIngredient } from '../types/data';

export const addIngredientToConstructor = (ingredient: TIngredient) => ({
  type: ADD_INGREDIENT_TO_CONSTRUCTOR,
  payload: { ...ingredient, _cartId: uniqid() },
});

export const removeIngredientFromConstructor = (ingredient: Pick<TMainIngredient, '_cartId' | 'price'>) => ({
  type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  payload: ingredient,
});

export const replaceBunInConstructor = (bun: TIngredient) => ({
  type: REPLACE_BUN_IN_CONSTRUCTOR,
  payload: bun,
});

export const updateConstructorFromDraggingContainer = () => ({
  type: UPDATE_CONSTRUCTOR_FROM_DRAGGING_CONTAINER,
});

export const copyConstructorToDraggingContainer = () => ({
  type: COPY_CONSTRUCTOR_TO_DRAGGING_CONTAINER,
});

export const replaceItemsInDraggingContainer = (
  replacingItems: { initialIndex: number, targetIndex: number },
) => ({
  type: REPLACE_ITEMS_IN_DRAGGING_CONTAINER,
  payload: replacingItems,
});

export const resetDraggingContainer = () => ({
  type: RESET_DRAGGING_CONTAINER,
});

export const resetConstructor = () => ({
  type: RESET_CONSTRUCTOR,
});
