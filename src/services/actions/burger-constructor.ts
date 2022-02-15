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
import {
  TIngredient, TMainIngredient, TRemovedIngredient, TReplacingItems,
} from '../types/data';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly payload: TMainIngredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly payload: TRemovedIngredient;
}

export interface IReplaceBunAction {
  readonly type: typeof REPLACE_BUN_IN_CONSTRUCTOR;
  readonly payload: TIngredient;
}

export interface IUpdateConstructorFromDraggingContainerAction {
  readonly type: typeof UPDATE_CONSTRUCTOR_FROM_DRAGGING_CONTAINER;
}

export interface ICopyConstructorToDraggingContainerAction {
  readonly type: typeof COPY_CONSTRUCTOR_TO_DRAGGING_CONTAINER;
}

export interface IReplaceItemsInDraggingContainerAction {
  readonly type: typeof REPLACE_ITEMS_IN_DRAGGING_CONTAINER;
  readonly payload: TReplacingItems;
}

export interface IResetDraggingContainerAction {
  readonly type: typeof RESET_DRAGGING_CONTAINER;
}

export interface IResetConstructorAction {
  readonly type: typeof RESET_CONSTRUCTOR;
}

export type TConstructorActions =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IReplaceBunAction
  | IUpdateConstructorFromDraggingContainerAction
  | ICopyConstructorToDraggingContainerAction
  | IReplaceItemsInDraggingContainerAction
  | IResetDraggingContainerAction
  | IResetConstructorAction;

export const addIngredientAction = (
  ingredient: TIngredient,
): IAddIngredientAction => ({
  type: ADD_INGREDIENT_TO_CONSTRUCTOR,
  payload: { ...ingredient, _cartId: uniqid() },
});

export const removeIngredientAction = (
  ingredient: TRemovedIngredient,
): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  payload: ingredient,
});

export const replaceBunAction = (bun: TIngredient): IReplaceBunAction => ({
  type: REPLACE_BUN_IN_CONSTRUCTOR,
  payload: bun,
});

export const updateConstructorFromDraggingContainerAction = ():
IUpdateConstructorFromDraggingContainerAction => ({
  type: UPDATE_CONSTRUCTOR_FROM_DRAGGING_CONTAINER,
});

export const copyConstructorToDraggingContainerAction = ():
ICopyConstructorToDraggingContainerAction => ({
  type: COPY_CONSTRUCTOR_TO_DRAGGING_CONTAINER,
});

export const replaceItemsInDraggingContainerAction = (
  replacingItems: TReplacingItems,
): IReplaceItemsInDraggingContainerAction => ({
  type: REPLACE_ITEMS_IN_DRAGGING_CONTAINER,
  payload: replacingItems,
});

export const resetDraggingContainerAction = (): IResetDraggingContainerAction => ({
  type: RESET_DRAGGING_CONTAINER,
});

export const resetConstructorAction = (): IResetConstructorAction => ({
  type: RESET_CONSTRUCTOR,
});
