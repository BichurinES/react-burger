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
} from '../actions/action-types';
import type { TWsActions } from '../actions/ws-actions';
import { TUpdatedFeed } from '../types/data';

export type TWSState = {
  wsRequest: boolean;
  wsFeedConnected: boolean;
  feedError?: Event | null;
  feed: TUpdatedFeed | null;
  wsUserOrdersConnected: boolean;
  userOrdersError?: Event | null;
  userOrders: TUpdatedFeed | null;
  feedRequest: boolean;
  feedFailed: boolean;
};

const initState: TWSState = {
  wsRequest: false,
  wsFeedConnected: false,
  feed: null,
  wsUserOrdersConnected: false,
  userOrders: null,
  feedRequest: false,
  feedFailed: false,
};

export default function wsReducer(state = initState, action: TWsActions): TWSState {
  switch (action.type) {
    case WS_FEED_CONNECTION_START: {
      return {
        ...state,
        wsRequest: true,
      };
    }
    case WS_FEED_CONNECTION_STOP: {
      return {
        ...state,
        wsFeedConnected: false,
      };
    }
    case WS_FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsFeedConnected: true,
        feedError: null,
      };
    }
    case WS_FEED_CONNECTION_ERROR: {
      return {
        ...state,
        wsRequest: false,
        feedError: action.payload,
      };
    }
    case WS_FEED_CONNECTION_CLOSED: {
      return {
        ...state,
        wsFeedConnected: false,
        feedError: null,
      };
    }
    case WS_GET_FEED: {
      return {
        ...state,
        wsRequest: false,
        feed: action.payload,
      };
    }
    case WS_USER_ORDERS_CONNECTION_START: {
      return {
        ...state,
        wsRequest: true,
      };
    }
    case WS_USER_ORDERS_CONNECTION_STOP: {
      return {
        ...state,
        wsUserOrdersConnected: false,
      };
    }
    case WS_USER_ORDERS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsUserOrdersConnected: true,
        userOrdersError: null,
      };
    }
    case WS_USER_ORDERS_CONNECTION_ERROR: {
      return {
        ...state,
        wsRequest: false,
        userOrdersError: action.payload,
      };
    }
    case WS_USER_ORDERS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsUserOrdersConnected: false,
        userOrdersError: null,
      };
    }
    case WS_GET_USER_ORDERS: {
      return {
        ...state,
        wsRequest: false,
        userOrders: action.payload,
      };
    }
    case FEED_REQUEST: {
      return {
        ...state,
        feedRequest: true,
        feedFailed: false,
      };
    }
    case FEED_SUCCESS: {
      return {
        ...state,
        feedRequest: false,
        feed: action.payload,
      };
    }
    case FEED_FAILED: {
      return {
        ...state,
        feedRequest: false,
        feedFailed: true,
      };
    }
    default: {
      return state;
    }
  }
}
