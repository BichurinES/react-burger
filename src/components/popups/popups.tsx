import React, { useCallback, useMemo } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorPopup from '../error-popup/error-popup';
import {
  closeOrderDetailsAction, closeErrorPopupAction, closeSuccessPopupAction,
} from '../../services/actions/popups';
import SuccessPopup from '../success-popup/success-popup';
import { useDispatch, useSelector, useLocation } from '../../services/hooks';

const Popups = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state ? location.state.background : null;
  const {
    isOrderDetailsOpen, isErrorPopupOpen, isSuccessPopupOpen,
  } = useSelector((state) => state.popups);

  const handleCloseRoutePopup = useCallback(
    () => {
      history.replace({ ...background, state: null });
    },
    [history, background],
  );

  const handleClosePopup = useCallback(
    () => {
      dispatch(closeOrderDetailsAction());
      dispatch(closeErrorPopupAction());
      dispatch(closeSuccessPopupAction());
    },
    [],
  );

  const isPopupOpen = useMemo(
    () => isOrderDetailsOpen || isErrorPopupOpen || isSuccessPopupOpen,
    [isOrderDetailsOpen, isErrorPopupOpen, isSuccessPopupOpen],
  );

  if (background) {
    return (
      <Route path="/ingredients/:id">
        <Modal title="Детали ингредиента" handleClosePopup={handleCloseRoutePopup}>
          <IngredientDetails />
        </Modal>
      </Route>
    );
  }

  return isPopupOpen
    ? (
      <Modal handleClosePopup={handleClosePopup}>
        {isOrderDetailsOpen && <OrderDetails />}
        {isErrorPopupOpen && <ErrorPopup />}
        {isSuccessPopupOpen && <SuccessPopup />}
      </Modal>
    )
    : null;
};

export default Popups;
