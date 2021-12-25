import { getIngredientsRequest } from '../normaApi';
import { OPEN_ERROR_POPUP } from './popups';
import { REPLACE_BUN_IN_CONSTRUCTOR } from './burger-constructor';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  getIngredientsRequest()
    .then((res) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: REPLACE_BUN_IN_CONSTRUCTOR,
        payload: res.data.find((item) => item.type === 'bun'),
      });
    })
    .catch((err) => {
      dispatch({ type: GET_INGREDIENTS_FAILED });
      dispatch({
        type: OPEN_ERROR_POPUP,
        payload: err.message,
      });
    });
};
