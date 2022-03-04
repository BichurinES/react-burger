import {
  applyMiddleware, createStore, compose, Action, ActionCreator,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { rootReducer } from './reducers';
import type { TConstructorActions } from './actions/burger-constructor';
import type { TIngredientsActions } from './actions/burger-ingredients';
import type { TForgotPasswordActions } from './actions/forgot-password';
import type { TLoginActions } from './actions/login';
import type { TPopupActions } from './actions/popups';
import type { TProfileActions } from './actions/profile';
import type { TRegisterActions } from './actions/register';
import type { TResetPasswordActions } from './actions/reset-password';
import type { TWsActions } from './actions/ws-actions';
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_GET_FEED,
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_GET_USER_ORDERS,
  WS_FEED_CONNECTION_STOP,
  WS_USER_ORDERS_CONNECTION_STOP,
} from './actions/action-types';
import { socketMiddleware } from './middleware/socket-middleware';
import { WS_FEED_URL, WS_MY_ORDERS_URL } from '../utils/constants';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type TWsFeedActionNames = {
  wsInit: typeof WS_FEED_CONNECTION_START;
  wsStop: typeof WS_FEED_CONNECTION_STOP;
  onOpen: typeof WS_FEED_CONNECTION_SUCCESS;
  onClose: typeof WS_FEED_CONNECTION_CLOSED;
  onError: typeof WS_FEED_CONNECTION_ERROR;
  onMessage: typeof WS_GET_FEED;
};

export const wsFeedActionNames: TWsFeedActionNames = {
  wsInit: WS_FEED_CONNECTION_START,
  wsStop: WS_FEED_CONNECTION_STOP,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_GET_FEED,
};

export type TWsUserOrdersActionNames = {
  wsInit: typeof WS_USER_ORDERS_CONNECTION_START;
  wsStop: typeof WS_USER_ORDERS_CONNECTION_STOP;
  onOpen: typeof WS_USER_ORDERS_CONNECTION_SUCCESS;
  onClose: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
  onError: typeof WS_USER_ORDERS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_USER_ORDERS;
};

export const wsUserOrdersActionNames: TWsUserOrdersActionNames = {
  wsInit: WS_USER_ORDERS_CONNECTION_START,
  wsStop: WS_USER_ORDERS_CONNECTION_STOP,
  onOpen: WS_USER_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_USER_ORDERS_CONNECTION_CLOSED,
  onError: WS_USER_ORDERS_CONNECTION_ERROR,
  onMessage: WS_GET_USER_ORDERS,
};

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enchancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(WS_FEED_URL, wsFeedActionNames, false),
    socketMiddleware(WS_MY_ORDERS_URL, wsUserOrdersActionNames, true),
  ),
);

export const store = createStore(rootReducer, enchancer);
export type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TForgotPasswordActions
  | TLoginActions
  | TPopupActions
  | TProfileActions
  | TRegisterActions
  | TResetPasswordActions
  | TWsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, RootState, Action, TApplicationActions>
>;
