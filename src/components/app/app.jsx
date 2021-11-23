import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorPopup from '../error-popup/error-popup';
import { ingredientsURL, filtrationKeys } from '../../utils/constants';
import { filterIngredients } from '../../utils/utils';
import { BurgerConstructorContext, PopupControlContext } from '../../contexts/appContext';

function App() {
  const [filteredIngredients, setFilteredIngredients] = React.useState({});
  const [burger, setBurger] = React.useState({});
  const [orderDetails, setOrderDetails] = React.useState({
    isOpen: false,
    content: '',
  });
  const [ingredientDetails, setIngredientDetails] = React.useState({
    isOpen: false,
    content: {},
  });
  const [errorPopup, setErrorPopup] = React.useState({
    isOpen: false,
    content: '',
  });

  function openOrderDetails(content) {
    setOrderDetails({
      isOpen: true,
      content,
    })
  }

  function openIngredientDetails(content) {
    setIngredientDetails({
      isOpen: true,
      content,
    })
  }

  function openErrorPopup(content) {
    setErrorPopup({
      isOpen: true,
      content,
    })
  }

  function closeAllPopups() {
    setOrderDetails({
      isOpen: false,
      content: '',
    });
    setIngredientDetails({
      isOpen: false,
      content: {},
    });
    setErrorPopup({
      isOpen: false,
      content: '',
    });
  }

  React.useEffect(() => {
    fetch(ingredientsURL)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.message)
        }
      })
      .then(res => {
        const filteredRes = filterIngredients(res.data, filtrationKeys);
        setFilteredIngredients(filteredRes);
        setBurger({ bun: filteredRes.bun[0], main: [...filteredRes.sauce, ...filteredRes.main] });
      })
      .catch(err => openErrorPopup(err.message));
  }, []);

  return (
    <BurgerConstructorContext.Provider value={{burger, setBurger}}>
      <PopupControlContext.Provider value={{openOrderDetails, openIngredientDetails, openErrorPopup, closeAllPopups}}>
        <div className={styles.app}>
          <AppHeader />
          <Main filteredIngredients={filteredIngredients} />
          {orderDetails.isOpen && (
            <OrderDetails orderId={orderDetails.content} />
          )}
          {ingredientDetails.isOpen && (
            <IngredientDetails {...ingredientDetails.content} />
          )}
          {errorPopup.isOpen && (
            <ErrorPopup content={errorPopup.content} />
          )}
        </div>
      </PopupControlContext.Provider>
    </BurgerConstructorContext.Provider>
  );
}

export default App;
