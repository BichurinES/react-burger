/* eslint-disable react/jsx-no-useless-fragment */
import React, { useCallback } from 'react';
import { NavLink, useHistory, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './profile.module.css';
import { signOut } from '../services/actions/profile';
import EditUser from '../components/edit-user/edit-user';

function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogoutBtnClick = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(signOut())
        .then((res) => {
          if (res) {
            history.replace('/login');
          }
        });
    },
    [history],
  );

  return (
    <section className={styles.section}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/profile"
              exact
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={styles.link_active}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/orders"
              exact
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={styles.link_active}
            >
              История заказов
            </NavLink>

          </li>
          <li>
            <NavLink
              to="/login"
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
      <Route path="/profile" exact>
        <EditUser />
      </Route>
      <Route path="/profile/orders" exact>
        <></>
      </Route>
      <div className={styles['centering-block']} />
    </section>
  );
}

export default Profile;
