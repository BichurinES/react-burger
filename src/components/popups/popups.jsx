import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorPopup from '../error-popup/error-popup';
import { closeOrderDetails, closeErrorPopup, closeSuccessPopup } from '../../services/actions/popups';
import SuccessPopup from '../success-popup/success-popup';

function Popups({ background }) {
  const history = useHistory();
  const dispatch = useDispatch();
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
      dispatch(closeOrderDetails());
      dispatch(closeErrorPopup());
      dispatch(closeSuccessPopup());
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
}

Popups.defaultProps = {
  background: null,
};

Popups.propTypes = {
  background: PropTypes.objectOf(PropTypes.any),
};

export default Popups;
