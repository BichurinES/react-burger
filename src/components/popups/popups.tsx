import React, { useCallback, useMemo } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ErrorPopup from '../error-popup/error-popup';
import PastOrderDetails from '../past-order-details/past-order-details';
import {
  closeOrderDetailsAction, closeErrorPopupAction, closeSuccessPopupAction,
} from '../../services/actions/popups';
import SuccessPopup from '../success-popup/success-popup';
import { useDispatch, useSelector, useLocation } from '../../services/hooks';
import { FEED_ID_PATH, INGREDIENTS_ID_PATH, PROFILE_ORDERS_ID_PATH } from '../../utils/constants';

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
      <>
        <Route path={INGREDIENTS_ID_PATH}>
          <Modal title="Детали ингредиента" handleClosePopup={handleCloseRoutePopup}>
            <IngredientDetails />
          </Modal>
        </Route>
        <Route path={FEED_ID_PATH} exact>
          <Modal handleClosePopup={handleCloseRoutePopup}>
            <PastOrderDetails />
          </Modal>
        </Route>
        <Route path={PROFILE_ORDERS_ID_PATH} exact>
          <Modal handleClosePopup={handleCloseRoutePopup}>
            <PastOrderDetails />
          </Modal>
        </Route>
      </>
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
