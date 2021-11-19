import React from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderMainData, orderBunData } from '../../utils/constants';
import BunElement from '../bun-element/bun-element';
import MainElement from '../main-element/main-element';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const [totalPrice, setTotalPrice] = React.useState(
    [...orderBunData, ...orderMainData].reduce(((sum, item) => sum += item.price), 0)
  );

  return (
    <section className={`${styles.container} pt-25 pl-4`}>

      <ul className={`${styles["order-list"]}`}>
        <BunElement className="pl-8" pos="top" card={orderBunData[0]} />
        <ul className={`${styles["order-list"]} ${styles["order-list-main"]} pr-2`}>
          {orderMainData.map(card => <MainElement card={card} key={card._id} />)}
        </ul>
        <BunElement className="pl-8" pos="bottom" card={orderBunData[0]} />
      </ul>
      
      <div className={`${styles["info-container"]} mt-10 mr-4`}>
        <p className={`${styles.price} text text_type_digits-medium mr-10`}>
          <span className="mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
