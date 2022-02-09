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

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enchancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enchancer);
type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TForgotPasswordActions
  | TLoginActions
  | TPopupActions
  | TProfileActions
  | TRegisterActions
  | TResetPasswordActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
