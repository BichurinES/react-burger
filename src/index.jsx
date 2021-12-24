import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals.ts';
import App from './components/app/app';
import { rootReducer } from './services/reducers';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enchancer = composeEnhancers(applyMiddleware(thunk));

// const initialState = {
//   ingredients: {},
//   burgerConstructorIngredients: {},
//   viewedIngredient: {},
//   orderData: {},
//   openedPopup: {},
// };

const store = createStore(rootReducer, enchancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
