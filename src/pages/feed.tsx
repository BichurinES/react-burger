import React, { useEffect } from 'react';
import Orders from '../components/orders/orders';
import OrdersStatus from '../components/orders-status/orders-status';
import styles from './feed.module.css';
import ModalLoader from '../components/modal-loader/modal-loader';
import { wsFeedConnectionStartAction, wsFeedConnectionStopAction } from '../services/actions/ws-actions';
import { useSelector, useDispatch } from '../services/hooks';

const Feed = () => {
  const dispatch = useDispatch();
  const { ws, profile } = useSelector((state) => state);
  const { feed } = ws;
  const { accessToken } = profile;

  useEffect(() => {
    if (accessToken) {
      dispatch(wsFeedConnectionStartAction());
    }
    return () => {
      dispatch(wsFeedConnectionStopAction());
    };
  }, [accessToken]);

  return (
    <section className={`${styles.container} mt-10`}>
      <h1 className={`${styles.title} text text_type_main-large mb-5`}>Лента заказов</h1>
      <div className={styles.content}>
        <div className={`${styles['orders-list']} mr-15`}>
          <Orders ordersData={feed ? feed.orders : []} />
        </div>
        <div className={styles['orders-status']}>
          <OrdersStatus />
        </div>
      </div>
      {!feed ? <ModalLoader /> : null}
    </section>
  );
};

export default Feed;
