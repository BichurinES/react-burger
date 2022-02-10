import React from 'react';
import Orders from '../components/orders/orders';
import OrdersStatus from '../components/orders-status/orders-status';
import styles from './feed.module.css';
import { TFeed } from '../services/types/data';

const Feed = () => {
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

  return (
    <section className={`${styles.container} mt-10`}>
      <h1 className={`${styles.title} text text_type_main-large mb-5`}>Лента заказов</h1>
      <div className={styles.content}>
        <div className={`${styles['orders-list']} mr-15`}>
          <Orders ordersData={feedData.orders} />
        </div>
        <div className={styles['orders-status']}>
          <OrdersStatus feedData={feedData} />
        </div>
      </div>
    </section>
  );
};

export default Feed;
