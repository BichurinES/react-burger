/* eslint-disable react/jsx-no-useless-fragment */
import React, { useCallback } from 'react';
import { NavLink, useHistory, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './profile.module.css';
import { signOut } from '../services/actions/profile';
import EditUser from '../components/edit-user/edit-user';
import Orders from '../components/orders/orders';
import { TFeed } from '../services/types/data';

const Profile = () => {
  const feedData: TFeed = {
    success: true,
    orders: [
      {
        _id: '620216346d7cd8001b2d4b07',
        ingredients: ['60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733c7'],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2022-02-08T07:05:24.654Z',
        updatedAt: '2022-02-08T07:05:24.964Z',
        number: 9662,
      },
      {
        _id: '6201e7d96d7cd8001b2d4ae2',
        ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733cc', '60d3b41abdacab0026a733c9', '60d3b41abdacab0026a733d0', '60d3b41abdacab0026a733d1', '60d3b41abdacab0026a733d0', '60d3b41abdacab0026a733d1'],
        status: 'done',
        name: 'Краторный бессмертный минеральный spicy фалленианский бургер',
        createdAt: '2022-02-08T03:47:37.055Z',
        updatedAt: '2022-02-08T03:47:37.320Z',
        number: 9661,
      },
      {
        _id: '6201a1c56d7cd8001b2d4abe',
        ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733cf', '60d3b41abdacab0026a733c9'],
        status: 'done',
        name: 'Space бессмертный флюоресцентный антарианский бургер',
        createdAt: '2022-02-07T22:48:37.133Z',
        updatedAt: '2022-02-07T22:48:37.412Z',
        number: 9660,
      },
      {
        _id: '62018f466d7cd8001b2d4aae',
        ingredients: ['60d3b41abdacab0026a733c9', '60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733cf', '60d3b41abdacab0026a733c7'],
        status: 'done',
        name: 'Space бессмертный флюоресцентный антарианский бургер',
        createdAt: '2022-02-07T21:29:42.510Z',
        updatedAt: '2022-02-07T21:29:42.848Z',
        number: 9659,
      },
      {
        _id: '620216346d7cd8001b2d4b07',
        ingredients: ['60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733c7'],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2022-02-08T07:05:24.654Z',
        updatedAt: '2022-02-08T07:05:24.964Z',
        number: 9662,
      },
      {
        _id: '6201e7d96d7cd8001b2d4ae2',
        ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733cc', '60d3b41abdacab0026a733c9', '60d3b41abdacab0026a733d0', '60d3b41abdacab0026a733d1', '60d3b41abdacab0026a733d0', '60d3b41abdacab0026a733d1'],
        status: 'done',
        name: 'Краторный бессмертный минеральный spicy фалленианский бургер',
        createdAt: '2022-02-08T03:47:37.055Z',
        updatedAt: '2022-02-08T03:47:37.320Z',
        number: 9661,
      },
      {
        _id: '6201a1c56d7cd8001b2d4abe',
        ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733cf', '60d3b41abdacab0026a733c9'],
        status: 'done',
        name: 'Space бессмертный флюоресцентный антарианский бургер',
        createdAt: '2022-02-07T22:48:37.133Z',
        updatedAt: '2022-02-07T22:48:37.412Z',
        number: 9660,
      },
      {
        _id: '62018f466d7cd8001b2d4aae',
        ingredients: ['60d3b41abdacab0026a733c9', '60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733cf', '60d3b41abdacab0026a733c7'],
        status: 'done',
        name: 'Space бессмертный флюоресцентный антарианский бургер',
        createdAt: '2022-02-07T21:29:42.510Z',
        updatedAt: '2022-02-07T21:29:42.848Z',
        number: 9659,
      },
      {
        _id: '6201e7d96d7cd8001b2d4ae2',
        ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733cc', '60d3b41abdacab0026a733c9', '60d3b41abdacab0026a733d0', '60d3b41abdacab0026a733d1', '60d3b41abdacab0026a733d0', '60d3b41abdacab0026a733d1'],
        status: 'pending',
        name: 'Краторный бессмертный минеральный spicy фалленианский бургер',
        createdAt: '2022-02-08T03:47:37.055Z',
        updatedAt: '2022-02-08T03:47:37.320Z',
        number: 9661,
      },
      {
        _id: '6201a1c56d7cd8001b2d4abe',
        ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733cf', '60d3b41abdacab0026a733c9'],
        status: 'pending',
        name: 'Space бессмертный флюоресцентный антарианский бургер',
        createdAt: '2022-02-07T22:48:37.133Z',
        updatedAt: '2022-02-07T22:48:37.412Z',
        number: 9660,
      },
      {
        _id: '62018f466d7cd8001b2d4aae',
        ingredients: ['60d3b41abdacab0026a733c9', '60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733cf', '60d3b41abdacab0026a733c7'],
        status: 'pending',
        name: 'Space бессмертный флюоресцентный антарианский бургер',
        createdAt: '2022-02-07T21:29:42.510Z',
        updatedAt: '2022-02-07T21:29:42.848Z',
        number: 9659,
      },
    ],
    total: 4,
    totalToday: 4,
  };
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogoutBtnClick = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(signOut(() => history.replace('/login')));
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
        <div className={styles['centering-block']} />
      </Route>
      <Route path="/profile/orders" exact>
        <div className={styles.orders}>
          <Orders ordersData={feedData.orders} />
        </div>
      </Route>
    </section>
  );
};

export default Profile;
