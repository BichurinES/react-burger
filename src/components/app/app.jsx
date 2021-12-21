import React, { useState, useEffect, useMemo } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorPopup from '../error-popup/error-popup';
import { getData } from '../../utils/normaApi';
import { filterIngredients } from '../../utils/utils';
import { BurgerConstructorContext, PopupControlContext } from '../../contexts/appContext';

function App() {
  const [filteredIngredients, setFilteredIngredients] = useState({});
  const [burger, setBurger] = useState({});
  const [orderDetails, setOrderDetails] = useState({
    isOpen: false,
    content: '',
  });
  const [ingredientDetails, setIngredientDetails] = useState({
    isOpen: false,
    content: {},
  });
  const [errorPopup, setErrorPopup] = useState({
    isOpen: false,
    content: '',
  });

  function openOrderDetails(content) {
    setOrderDetails({
      isOpen: true,
      content,
    });
  }

  function openIngredientDetails(content) {
    setIngredientDetails({
      isOpen: true,
      content,
    });
  }

  function openErrorPopup(content) {
    setErrorPopup({
      isOpen: true,
      content,
    });
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

  useEffect(() => {
    getData()
      .then((res) => {
        const filteredRes = filterIngredients(res.data);
        const defaultBun = filteredRes.bun[0];
        setFilteredIngredients(filteredRes);
        setBurger({ bun: defaultBun, main: [...filteredRes.sauce, ...filteredRes.main] });
      })
      .catch((err) => openErrorPopup(err.message));
  }, []);

  return (
    <BurgerConstructorContext.Provider value={useMemo(() => (
      { burger, setBurger }), [burger])}
    >
      <PopupControlContext.Provider value={
          useMemo(() => ({
            openOrderDetails,
            openIngredientDetails,
            openErrorPopup,
            closeAllPopups,
          }))
        }
      >
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
