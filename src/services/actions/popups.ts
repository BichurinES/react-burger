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
import { TSuccessResetPassword } from '../types/data';
import { AppDispatch } from '../store';

export const closeOrderDetails = () => ({
  type: CLOSE_ORDER_DETAILS,
});

export const openErrorPopup = (error: { message?: string }) => ({
  type: OPEN_ERROR_POPUP,
  payload: { message: error.message },
});

export const closeErrorPopup = () => ({
  type: CLOSE_ERROR_POPUP,
});

export const openSuccessPopup = (successData: TSuccessResetPassword) => ({
  type: OPEN_SUCCESS_POPUP,
  payload: { message: successData.message },
});

export const closeSuccessPopup = () => ({
  type: CLOSE_SUCCESS_POPUP,
});

export const getOrderDetails = (ingredients: ReadonlyArray<string>) => (
  dispatch: AppDispatch,
) => {
  dispatch({ type: GET_ORDER_DETAILS_REQUEST });
  sendOrderRequest({ ingredients })
    .then((res) => {
      dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({ type: GET_ORDER_DETAILS_FAILED });
      dispatch(openErrorPopup(err));
    });
};
