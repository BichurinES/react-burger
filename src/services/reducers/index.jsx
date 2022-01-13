import { combineReducers } from 'redux';
import burgerIngredientsReducer from './burger-ingredients';
import burgerConstructorReducer from './burger-constructor';
import popupsReducer from './popups';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  popups: popupsReducer,
});
