import React, { useMemo } from 'react';
import styles from './orders-status.module.css';
import { useSelector } from '../../services/hooks';

const OrdersStatus = () => {
  const { feed } = useSelector((state) => state.ws);

  const filteredOrders = useMemo(
    () => {
      if (!feed) {
        return { done: [], pending: [] };
      }

      const done: Array<number> = [];
      const pending: Array<number> = [];
      feed.orders.forEach((order) => {
        if (order.status === 'done' && done.length < 10) {
          done.push(order.number);
        } else if (order.status === 'pending' && pending.length < 10) {
          pending.push(order.number);
        }
      });
      return { done, pending };
    },
    [feed],
  );

  return (
    <>
      <div className={styles.numbers}>
        <div className={`${styles.column} mr-9`}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={`${styles.list} ${styles['done-list']}`}>
            {filteredOrders.done.map((orderNumber) => (
              <li
                key={orderNumber}
                className={`
                  ${styles['list-item']}
                  ${styles['list-item_done']}
                  text text_type_digits-default`}
              >
                {orderNumber}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <ul className={styles.list}>
            {filteredOrders.pending.map((orderNumber) => (
              <li
                key={orderNumber}
                className={`${styles['list-item']} text text_type_digits-default`}
              >
                {orderNumber}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`${styles.total} text text_type_digits-large`}>{feed ? feed.total : 0}</p>
      </div>
      <div className="mt-15">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${styles.total} text text_type_digits-large`}>{feed ? feed.totalToday : 0}</p>
      </div>
    </>
  );
};

export default OrdersStatus;
