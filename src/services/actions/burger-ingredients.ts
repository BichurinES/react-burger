import { getIngredientsRequest } from '../norma-api';
import { openErrorPopup } from './popups';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  RESET_INGREDIENTS_COUNT,
} from './action-types';
import { TIngredient } from '../types/data';
import { AppDispatch } from '../store';

export const increaseIngredient = (ingredient: Pick<TIngredient, '_id'>) => ({
  type: INCREASE_INGREDIENT,
  payload: ingredient,
});

export const decreaseIngredient = (ingredient: Pick<TIngredient, '_id'>) => ({
  type: DECREASE_INGREDIENT,
  payload: ingredient,
});

export const resetIngredientsCount = () => ({
  type: RESET_INGREDIENTS_COUNT,
});

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  getIngredientsRequest()
    .then((res) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: GET_INGREDIENTS_FAILED });
      dispatch(openErrorPopup(err));
    });
};
