import { sendOrder } from '../../utils/normaApi';

export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';
export const OPEN_ERROR_POPUP = 'OPEN_ERROR_POPUP';
export const CLOSE_ALL_POPUPS = 'CLOSE_ALL_POPUPS';

export const getOrderDetails = (ingredients) => (dispatch) => {
  dispatch({ type: GET_ORDER_DETAILS_REQUEST });
  sendOrder({ ingredients })
    .then((res) => {
      dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        payload: res.order,
      });
    })
    .catch((err) => {
      dispatch({ type: GET_ORDER_DETAILS_FAILED });
      dispatch({
        type: OPEN_ERROR_POPUP,
        payload: err,
      });
    });
};
