import { combineReducers } from 'redux';
import burgerIngredientsReducer from './burger-ingredients';
import burgerConstructorReducer from './burger-constructor';
import popupsReducer from './popups';
import profileReducer from './profile';
import registerReducer from './register';
import loginReducer from './login';
import forgotPasswordReducer from './forgot-password';
import resetPasswordReducer from './reset-password';
import wsReducer from './ws-reducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  popups: popupsReducer,
  profile: profileReducer,
  register: registerReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  ws: wsReducer,
});
