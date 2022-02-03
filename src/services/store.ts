import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { TBurgerIngredientsState } from './reducers/burger-ingredients';
import { TBurgerConstructorState } from './reducers/burger-constructor';
import { TPopupsState } from './reducers/popups';
import { TProfilesState } from './reducers/profile';
import { TRegisterState } from './reducers/register';
import { TLoginState } from './reducers/login';
import { TForgotPasswordState } from './reducers/forgot-password';
import { TResetPasswordState } from './reducers/reset-password';
import { rootReducer } from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enchancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enchancer);

export type RootState = {
  ingredients: TBurgerIngredientsState,
  burgerConstructor: TBurgerConstructorState,
  popups: TPopupsState,
  profile: TProfilesState,
  register: TRegisterState,
  login: TLoginState,
  forgotPassword: TForgotPasswordState,
  resetPassword: TResetPasswordState,
};
export type AppDispatch = typeof store.dispatch;
