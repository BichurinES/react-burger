import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorPopup from '../error-popup/error-popup';
import {
  CLOSE_INGREDIENT_DETAILS,
  CLOSE_ORDER_DETAILS,
  CLOSE_ERROR_POPUP,
} from '../../services/actions/popups';

function Popups() {
  const dispatch = useDispatch();
  const {
    isIngredientDetailsOpen,
    isOrderDetailsOpen,
    isErrorPopupOpen,
  } = useSelector((state) => state.popups);

  const isPopupOpen = isIngredientDetailsOpen || isOrderDetailsOpen || isErrorPopupOpen;
  const title = isIngredientDetailsOpen ? 'Детали ингредиента' : '';
  const handleClosePopup = (
    isIngredientDetailsOpen ? () => dispatch({ type: CLOSE_INGREDIENT_DETAILS })
      : isOrderDetailsOpen ? () => dispatch({ type: CLOSE_ORDER_DETAILS })
        : isErrorPopupOpen ? () => dispatch({ type: CLOSE_ERROR_POPUP })
          : null
  );

  return isPopupOpen
    ? (
      <Modal title={title} handleClosePopup={handleClosePopup}>
        {isOrderDetailsOpen && (
          <OrderDetails />
        )}
        {isIngredientDetailsOpen && (
          <IngredientDetails />
        )}
        {isErrorPopupOpen && (
          <ErrorPopup />
        )}
      </Modal>
    )
    : null;
}

export default Popups;
