import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_STOP,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_GET_FEED,
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_STOP,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_GET_USER_ORDERS,
  FEED_REQUEST,
  FEED_SUCCESS,
  FEED_FAILED,
} from './action-types';
import { TOrderCard, TUpdatedFeed } from '../types/data';
import { AppThunk } from '../store';
import { getFeedRequest } from '../norma-api';
import { openErrorPopupAction } from './popups';
import { getCardData } from '../../utils/utils';

interface IWsFeedConnectionStartAction {
  type: typeof WS_FEED_CONNECTION_START;
}

interface IWsFeedConnectionStopAction {
  type: typeof WS_FEED_CONNECTION_STOP;
}

interface IWsFeedConnectionSuccessAction {
  type: typeof WS_FEED_CONNECTION_SUCCESS;
}

interface IWsFeedConnectionErrorAction {
  type: typeof WS_FEED_CONNECTION_ERROR;
  payload: Event,
}

interface IWsFeedConnectionClosedAction {
  type: typeof WS_FEED_CONNECTION_CLOSED;
}

interface IWsGetFeedAction {
  type: typeof WS_GET_FEED;
  payload: TUpdatedFeed;
}

interface IWsUserOrdersConnectionStartAction {
  type: typeof WS_USER_ORDERS_CONNECTION_START;
}

interface IWsUserOrdersConnectionStopAction {
  type: typeof WS_USER_ORDERS_CONNECTION_STOP;
}

interface IWsUserOrdersConnectionSuccessAction {
  type: typeof WS_USER_ORDERS_CONNECTION_SUCCESS;
}

interface IWsUserOrdersConnectionErrorAction {
  type: typeof WS_USER_ORDERS_CONNECTION_ERROR;
  payload: Event,
}

interface IWsUserOrdersConnectionClosedAction {
  type: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
}

interface IWsGetUserOrdersAction {
  type: typeof WS_GET_USER_ORDERS;
  payload: TUpdatedFeed;
}

interface IFeedRequestAction {
  type: typeof FEED_REQUEST;
}

interface IFeedSuccessAction {
  type: typeof FEED_SUCCESS;
  payload: TUpdatedFeed;
}

interface IFeedFailedAction {
  type: typeof FEED_FAILED;
}

export type TWsActions =
  | IWsFeedConnectionStartAction
  | IWsFeedConnectionStopAction
  | IWsFeedConnectionSuccessAction
  | IWsFeedConnectionErrorAction
  | IWsFeedConnectionClosedAction
  | IWsGetFeedAction
  | IWsUserOrdersConnectionStartAction
  | IWsUserOrdersConnectionStopAction
  | IWsUserOrdersConnectionSuccessAction
  | IWsUserOrdersConnectionErrorAction
  | IWsUserOrdersConnectionClosedAction
  | IWsGetUserOrdersAction
  | IFeedRequestAction
  | IFeedSuccessAction
  | IFeedFailedAction;

export const wsFeedConnectionStartAction = (): IWsFeedConnectionStartAction => ({
  type: WS_FEED_CONNECTION_START,
});

export const wsFeedConnectionStopAction = (): IWsFeedConnectionStopAction => ({
  type: WS_FEED_CONNECTION_STOP,
});

export const wsFeedConnectionSuccessAction = (): IWsFeedConnectionSuccessAction => ({
  type: WS_FEED_CONNECTION_SUCCESS,
});

export const wsFeedConnectionErrorAction = (
  error: Event,
): IWsFeedConnectionErrorAction => ({
  type: WS_FEED_CONNECTION_ERROR,
  payload: error,
});

export const wsFeedConnectionClosedAction = (): IWsFeedConnectionClosedAction => ({
  type: WS_FEED_CONNECTION_CLOSED,
});

export const wsGetFeedAction = (
  feedData: TUpdatedFeed,
): IWsGetFeedAction => ({
  type: WS_GET_FEED,
  payload: feedData,
});

export const wsUserOrdersConnectionStartAction = (): IWsUserOrdersConnectionStartAction => ({
  type: WS_USER_ORDERS_CONNECTION_START,
});

export const wsUserOrdersConnectionStopAction = (): IWsUserOrdersConnectionStopAction => ({
  type: WS_USER_ORDERS_CONNECTION_STOP,
});

export const wsUserOrdersConnectionSuccessAction = (): IWsUserOrdersConnectionSuccessAction => ({
  type: WS_USER_ORDERS_CONNECTION_SUCCESS,
});

export const wsUserOrdersConnectionErrorAction = (
  error: Event,
): IWsUserOrdersConnectionErrorAction => ({
  type: WS_USER_ORDERS_CONNECTION_ERROR,
  payload: error,
});

export const wsUserOrdersConnectionClosedAction = (): IWsUserOrdersConnectionClosedAction => ({
  type: WS_USER_ORDERS_CONNECTION_CLOSED,
});

export const wsUserOrdersGetMyFeedAction = (
  feedData: TUpdatedFeed,
): IWsGetUserOrdersAction => ({
  type: WS_GET_USER_ORDERS,
  payload: feedData,
});

export const feedRequestAction = (): IFeedRequestAction => ({
  type: FEED_REQUEST,
});

export const feedSuccessAction = (feedData: TUpdatedFeed): IFeedSuccessAction => ({
  type: FEED_SUCCESS,
  payload: feedData,
});

export const feedFailedAction = (): IFeedFailedAction => ({
  type: FEED_FAILED,
});

export const getFeed: AppThunk = () => (dispatch, getState) => {
  getFeedRequest()
    .then((data) => {
      const { ingredients } = getState();
      dispatch(feedSuccessAction({
        ...data,
        orders: data.orders.map((card: TOrderCard) => getCardData(card, ingredients.ingredients)),
      }));
    })
    .catch((error) => dispatch(openErrorPopupAction(error)));
};
