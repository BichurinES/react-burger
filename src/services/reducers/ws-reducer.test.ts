import reducer, { initialState } from './ws-reducer';
import {
  feedFailedAction,
  feedRequestAction,
  feedSuccessAction,
  wsFeedConnectionClosedAction,
  wsFeedConnectionErrorAction,
  wsFeedConnectionStartAction,
  wsFeedConnectionStopAction,
  wsFeedConnectionSuccessAction,
  wsGetFeedAction,
  wsGetUserOrdersAction,
  wsUserOrdersConnectionClosedAction,
  wsUserOrdersConnectionErrorAction,
  wsUserOrdersConnectionStartAction,
  wsUserOrdersConnectionStopAction,
  wsUserOrdersConnectionSuccessAction,
} from '../actions/ws-actions';
import { TEST_FEED } from '../../utils/constants';

describe('ws reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined)).toEqual(initialState);
  });

  it('should handle WS_FEED_CONNECTION_START', () => {
    expect(reducer(undefined, wsFeedConnectionStartAction())).toEqual({
      ...initialState,
      wsRequest: true,
    });
  });

  it('should handle WS_FEED_CONNECTION_SUCCESS', () => {
    expect(reducer({
      ...initialState,
      wsRequest: true,
    }, wsFeedConnectionSuccessAction())).toEqual({
      ...initialState,
      wsRequest: true,
      wsFeedConnected: true,
      feedError: null,
    });
  });

  it('should handle WS_FEED_CONNECTION_STOP', () => {
    expect(reducer({
      ...initialState,
      wsFeedConnected: true,
      feedError: null,
    }, wsFeedConnectionStopAction())).toEqual({
      ...initialState,
      wsFeedConnected: false,
      feedError: null,
    });
  });

  it('should handle WS_FEED_CONNECTION_ERROR', () => {
    const errorEvent = new Event('Error');
    expect(reducer({
      ...initialState,
      wsRequest: true,
    }, wsFeedConnectionErrorAction(errorEvent))).toEqual({
      ...initialState,
      wsRequest: false,
      feedError: errorEvent,
    });
  });

  it('should handle WS_FEED_CONNECTION_CLOSED', () => {
    expect(reducer({
      ...initialState,
      wsFeedConnected: true,
      feedError: null,
    }, wsFeedConnectionClosedAction())).toEqual({
      ...initialState,
      wsFeedConnected: false,
      feedError: null,
    });
  });

  it('should handle WS_GET_FEED', () => {
    expect(reducer({
      ...initialState,
      wsFeedConnected: true,
      feedError: null,
    }, wsGetFeedAction(TEST_FEED))).toEqual({
      ...initialState,
      wsFeedConnected: true,
      feedError: null,
      wsRequest: false,
      feed: TEST_FEED,
    });
  });

  it('should handle WS_USER_ORDERS_CONNECTION_START', () => {
    expect(reducer(undefined, wsUserOrdersConnectionStartAction())).toEqual({
      ...initialState,
      wsRequest: true,
    });
  });

  it('should handle WS_USER_ORDERS_CONNECTION_SUCCESS', () => {
    expect(reducer({
      ...initialState,
      wsRequest: true,
    }, wsUserOrdersConnectionSuccessAction())).toEqual({
      ...initialState,
      wsRequest: true,
      wsUserOrdersConnected: true,
      userOrdersError: null,
    });
  });

  it('should handle WS_USER_ORDERS_CONNECTION_STOP', () => {
    expect(reducer({
      ...initialState,
      wsUserOrdersConnected: true,
      userOrdersError: null,
    }, wsUserOrdersConnectionStopAction())).toEqual({
      ...initialState,
      wsUserOrdersConnected: false,
      userOrdersError: null,
    });
  });

  it('should handle WS_USER_ORDERS_CONNECTION_ERROR', () => {
    const errorEvent = new Event('Error');
    expect(reducer({
      ...initialState,
      wsRequest: true,
    }, wsUserOrdersConnectionErrorAction(errorEvent))).toEqual({
      ...initialState,
      wsRequest: false,
      userOrdersError: errorEvent,
    });
  });

  it('should handle WS_USER_ORDERS_CONNECTION_CLOSED', () => {
    expect(reducer({
      ...initialState,
      wsUserOrdersConnected: true,
      userOrdersError: null,
    }, wsUserOrdersConnectionClosedAction())).toEqual({
      ...initialState,
      wsUserOrdersConnected: false,
      userOrdersError: null,
    });
  });

  it('should handle WS_GET_USER_ORDERS', () => {
    expect(reducer({
      ...initialState,
      wsUserOrdersConnected: true,
      userOrdersError: null,
    }, wsGetUserOrdersAction(TEST_FEED))).toEqual({
      ...initialState,
      wsUserOrdersConnected: true,
      userOrdersError: null,
      wsRequest: false,
      userOrders: TEST_FEED,
    });
  });

  it('should handle FEED_REQUEST', () => {
    expect(reducer(undefined, feedRequestAction())).toEqual({
      ...initialState,
      feedRequest: true,
    });
  });

  it('should handle FEED_SUCCESS', () => {
    expect(reducer(undefined, feedSuccessAction(TEST_FEED))).toEqual({
      ...initialState,
      feed: TEST_FEED,
    });
  });

  it('should handle FEED_FAILED', () => {
    expect(reducer(undefined, feedFailedAction())).toEqual({
      ...initialState,
      feedFailed: true,
    });
  });
});
