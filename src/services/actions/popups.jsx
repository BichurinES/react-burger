import { sendOrderRequest } from '../norma-api';
import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  CLOSE_ORDER_DETAILS,
  OPEN_ERROR_POPUP,
  CLOSE_ERROR_POPUP,
  OPEN_SUCCESS_POPUP,
  CLOSE_SUCCESS_POPUP,
} from './action-types';

export const closeOrderDetails = () => ({
  type: CLOSE_ORDER_DETAILS,
});

export const openErrorPopup = (error) => ({
  type: OPEN_ERROR_POPUP,
  payload: error,
});

export const closeErrorPopup = () => ({
  type: CLOSE_ERROR_POPUP,
});

export const openSuccessPopup = (successData) => ({
  type: OPEN_SUCCESS_POPUP,
  payload: successData,
});

export const closeSuccessPopup = () => ({
  type: CLOSE_SUCCESS_POPUP,
});

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
      dispatch(openErrorPopup(err));
    });
};
