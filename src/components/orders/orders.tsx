import React, { FC } from 'react';
import styles from './orders.module.css';
import OrderCard from '../order-card/order-card';
import {
  TOrderUpdatedCard,
} from '../../services/types/data';

type TOrders = {
  ordersData: ReadonlyArray<TOrderUpdatedCard>
};

const Orders: FC<TOrders> = ({ ordersData }) => (
  <ul className={styles.list}>
    {ordersData.map((card) => (
      <OrderCard key={card._id} card={card} />
    ))}
  </ul>
);

export default Orders;
