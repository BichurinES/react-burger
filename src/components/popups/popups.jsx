import React from 'react';
import { useSelector } from 'react-redux';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorPopup from '../error-popup/error-popup';

function Popups() {
  const {
    isIngredientDetailsOpen,
    isOrderDetailsOpen,
    isErrorPopupOpen,
  } = useSelector((state) => state.popups);

  return (
    <>
      {isOrderDetailsOpen && (
        <OrderDetails />
      )}
      {isIngredientDetailsOpen && (
        <IngredientDetails />
      )}
      {isErrorPopupOpen && (
        <ErrorPopup />
      )}
    </>
  );
}

export default Popups;
