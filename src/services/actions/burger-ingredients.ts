import { ThunkAction } from 'redux-thunk';
import { getIngredientsRequest } from '../norma-api';
import { openErrorPopupAction } from './popups';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  RESET_INGREDIENTS_COUNT,
} from './action-types';
import { TIngredient, TIngredientId } from '../types/data';
import { IDefaultAction } from '.';
import { AppDispatch, RootState, TApplicationActions } from '../store';

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IIncreaseIngredientAction {
  readonly type: typeof INCREASE_INGREDIENT;
  readonly payload: TIngredientId;
}

export interface IDecreaseIngredientAction {
  readonly type: typeof DECREASE_INGREDIENT;
  readonly payload: TIngredientId;
}

export interface IResetIngredientCountAction {
  readonly type: typeof RESET_INGREDIENTS_COUNT;
}

export type TIngredientsActions =
  | IDefaultAction
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IIncreaseIngredientAction
  | IDecreaseIngredientAction
  | IResetIngredientCountAction;

export const getIngredientsAction = (): IGetIngredientsAction => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccessAction = (
  ingredients: ReadonlyArray<TIngredient>,
): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: ingredients,
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED,
});

export const increaseIngredientAction = (ingredient: TIngredientId): IIncreaseIngredientAction => ({
  type: INCREASE_INGREDIENT,
  payload: ingredient,
});

export const decreaseIngredientAction = (ingredient: TIngredientId): IDecreaseIngredientAction => ({
  type: DECREASE_INGREDIENT,
  payload: ingredient,
});

export const resetIngredientCountAction = (): IResetIngredientCountAction => ({
  type: RESET_INGREDIENTS_COUNT,
});
export type TAppThunk<TReturn = void> = ThunkAction<TReturn, RootState, {}, TApplicationActions>;
export function getIngredients(): TAppThunk<Promise<void>> {
  return function (dispatch: AppDispatch): Promise<void> {
    dispatch(getIngredientsAction());
    return getIngredientsRequest()
      .then((res) => {
        dispatch(getIngredientsSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(getIngredientsFailedAction());
        dispatch(openErrorPopupAction(err));
      });
  };
}
