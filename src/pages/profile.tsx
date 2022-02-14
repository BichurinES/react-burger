/* eslint-disable react/jsx-no-useless-fragment */
import React, { useCallback, useEffect } from 'react';
import { NavLink, useHistory, Route } from 'react-router-dom';
import styles from './profile.module.css';
import { signOut } from '../services/actions/profile';
import EditUser from '../components/edit-user/edit-user';
import Orders from '../components/orders/orders';
import ModalLoader from '../components/modal-loader/modal-loader';
import { useSelector, useDispatch } from '../services/hooks';
import { wsUserOrdersConnectionStartAction } from '../services/actions/ws-actions';
import { LOGIN_PATH, PROFILE_ORDERS_PATH, PROFILE_PATH } from '../utils/constants';

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { ws, profile } = useSelector((state) => state);
  const { userOrders } = ws;
  const { accessToken } = profile;

  const onLogoutBtnClick = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(signOut(() => history.replace(LOGIN_PATH)));
    },
    [history],
  );

  useEffect(() => {
    if (accessToken) {
      dispatch(wsUserOrdersConnectionStartAction());
    }
  }, []);

  return (
    <section className={styles.section}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <NavLink
              to={PROFILE_PATH}
              exact
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={styles.link_active}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to={PROFILE_ORDERS_PATH}
              exact
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={styles.link_active}
            >
              История заказов
            </NavLink>

          </li>
          <li>
            <NavLink
              to={LOGIN_PATH}
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={styles.link_active}
              onClick={onLogoutBtnClick}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`${styles.caption} text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </nav>
      <Route path={PROFILE_PATH} exact>
        <EditUser />
        <div className={styles['centering-block']} />
      </Route>
      <Route path={PROFILE_ORDERS_PATH} exact>
        <div className={styles.orders}>
          <Orders ordersData={userOrders ? [...userOrders.orders].reverse() : []} />
        </div>
      </Route>
      {!userOrders ? <ModalLoader /> : null}
    </section>
  );
};

export default Profile;
