import { sendOrderRequest } from '../norma-api';

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';
export const OPEN_ERROR_POPUP = 'OPEN_ERROR_POPUP';
export const CLOSE_ERROR_POPUP = 'CLOSE_ERROR_POPUP';
export const OPEN_SUCCESS_POPUP = 'OPEN_SUCCESS_POPUP';
export const CLOSE_SUCCESS_POPUP = 'CLOSE_SUCCESS_POPUP';

export const getOrderDetails = (ingredients) => (dispatch) => {
  dispatch({ type: GET_ORDER_DETAILS_REQUEST });
  sendOrderRequest({ ingredients })
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
