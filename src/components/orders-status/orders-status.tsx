import React, { FC, useCallback, useMemo } from 'react';
import styles from './orders-status.module.css';
import { TFeed, TOrderCard } from '../../services/types/data';

type TOrdersStatus = {
  feedData: TFeed;
};

const OrdersStatus: FC<TOrdersStatus> = ({ feedData }) => {
  const filterOrders = useCallback(
    (orders: ReadonlyArray<TOrderCard>) => {
      const done: Array<number> = [];
      const pending: Array<number> = [];
      orders.forEach((order) => {
        if (order.status === 'done' && done.length <= 10) {
          done.push(order.number);
        } else if (order.status === 'pending' && pending.length <= 10) {
          pending.push(order.number);
        }
      });
      return { done, pending };
    },
    [],
  );

  const filteredOrders = useMemo(() => filterOrders(feedData.orders), [feedData, filterOrders]);

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
        <p className={`${styles.total} text text_type_digits-large`}>{feedData.total}</p>
      </div>
      <div className="mt-15">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${styles.total} text text_type_digits-large`}>{feedData.totalToday}</p>
      </div>
    </>
  );
};

export default OrdersStatus;
