import type { Middleware, MiddlewareAPI } from 'redux';
import type {
  TApplicationActions, AppDispatch, RootState, TWsFeedActionNames, TWsUserOrdersActionNames,
} from '../store';
import { openErrorPopupAction } from '../actions/popups';
import { getCardData } from '../../utils/utils';

export const socketMiddleware = (wsUrl: string, wsActions:
TWsFeedActionNames | TWsUserOrdersActionNames, isToken: boolean): Middleware => (
  store: MiddlewareAPI<AppDispatch, RootState>,
) => {
  let socket: WebSocket | null = null;

  return (next) => (action: TApplicationActions) => {
    const { dispatch, getState } = store;
    const { type } = action;
    const {
      wsInit, wsStop, onOpen, onClose, onError, onMessage,
    } = wsActions;
    const { profile, ingredients } = getState();

    if (type === wsInit && profile.accessToken) {
      socket = new WebSocket(`${wsUrl}${isToken ? `?token=${profile.accessToken}` : ''}`);
    }

    if (socket) {
      if (type === wsStop) {
        socket.close(1000, 'Выход пользователя');
      }

      socket.onopen = () => dispatch({ type: onOpen });
      socket.onerror = (error: Event) => {
        dispatch({ type: onError, payload: error });
        dispatch(openErrorPopupAction(new Error(error.type)));
      };
      socket.onclose = () => dispatch({ type: onClose });
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (!data.success) {
          dispatch({
            type: onError,
            payload: new Event(data.message),
          });
          dispatch(openErrorPopupAction(new Error(data.message)));
          return;
        }
        dispatch({
          type: onMessage,
          payload: {
            ...data,
            orders: [...data.orders].map((card) => (getCardData(card, ingredients.ingredients))),
          },
        });
      };
    }
    next(action);
  };
};
