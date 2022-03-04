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
import type { TSuccessResetPassword, TOrderDetails } from '../types/data';
import { TOKEN_ERR_MSG } from '../../utils/constants';
import useToken from '../token';
import { IDefaultAction } from '.';
import type { AppThunk } from '../store';

export interface IGetOrderDetailsAction {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST;
}

export interface IGetOrderDetailsSuccessAction {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  readonly payload: TOrderDetails;
}

export interface IGetOrderDetailsFailedAction {
  readonly type: typeof GET_ORDER_DETAILS_FAILED;
}

export interface ICloseOrderDetailsAction {
  readonly type: typeof CLOSE_ORDER_DETAILS;
}

export interface IOpenErrorPopupAction {
  readonly type: typeof OPEN_ERROR_POPUP;
  readonly payload: Error;
}

export interface ICloseErrorPopupAction {
  readonly type: typeof CLOSE_ERROR_POPUP;
}

export interface IOpenSuccessPopupAction {
  readonly type: typeof OPEN_SUCCESS_POPUP;
  readonly payload: TSuccessResetPassword;
}

export interface ICloseSuccessPopupAction {
  readonly type: typeof CLOSE_SUCCESS_POPUP;
}

export type TPopupActions =
  | IDefaultAction
  | IGetOrderDetailsAction
  | IGetOrderDetailsSuccessAction
  | IGetOrderDetailsFailedAction
  | ICloseOrderDetailsAction
  | IOpenErrorPopupAction
  | ICloseErrorPopupAction
  | IOpenSuccessPopupAction
  | ICloseSuccessPopupAction;

export const getOrderDetailsAction = (): IGetOrderDetailsAction => ({
  type: GET_ORDER_DETAILS_REQUEST,
});

export const getOrderDetailsSuccessAction = (
  orderDetails: TOrderDetails,
): IGetOrderDetailsSuccessAction => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: orderDetails,
});

export const getOrderDetailsFailedAction = (): IGetOrderDetailsFailedAction => ({
  type: GET_ORDER_DETAILS_FAILED,
});

export const closeOrderDetailsAction = (): ICloseOrderDetailsAction => ({
  type: CLOSE_ORDER_DETAILS,
});

export const openErrorPopupAction = (error: Error): IOpenErrorPopupAction => ({
  type: OPEN_ERROR_POPUP,
  payload: error,
});

export const closeErrorPopupAction = (): ICloseErrorPopupAction => ({
  type: CLOSE_ERROR_POPUP,
});

export const openSuccessPopupAction = (
  successData: TSuccessResetPassword,
): IOpenSuccessPopupAction => ({
  type: OPEN_SUCCESS_POPUP,
  payload: successData,
});

export const closeSuccessPopupAction = (): ICloseSuccessPopupAction => ({
  type: CLOSE_SUCCESS_POPUP,
});

export const getOrderDetails: AppThunk = (ingredients: ReadonlyArray<string>) => (
  dispatch,
) => {
  dispatch(getOrderDetailsAction());
  const { getToken } = useToken();
  getToken()
    .then((token) => {
      if (token) {
        return sendOrderRequest({ ingredients }, token);
      }
      throw new Error(TOKEN_ERR_MSG);
    })
    .then((res) => {
      dispatch(getOrderDetailsSuccessAction(res));
    })
    .catch((err) => {
      dispatch(getOrderDetailsFailedAction());
      dispatch(openErrorPopupAction(err));
    });
};
