import React, { FC, useCallback } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import OrderCardIngredients from '../order-card-ingredients/order-card-ingredients';
import { TOrderUpdatedCard } from '../../services/types/data';

type TOrderCard = {
  card: TOrderUpdatedCard
};

const OrderCard: FC<TOrderCard> = ({ card }) => {
  const formatDate = useCallback(
    (dateString: string) => {
      const date = new Date(dateString);
      const dateDay = new Date(dateString).getDate();
      const today = new Date().getDate();
      const dayName = dateDay === today
        ? 'Сегодня' : dateDay === today - 1
          ? 'Вчера' : dateDay >= today - 4
            ? `${today - dateDay} дня назад` : date.toLocaleString('ru', { month: 'long', day: 'numeric' });
      const time = date.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' });
      const timeOffset = -date.getTimezoneOffset() / 60;
      return `${dayName}, ${time} i-GMT${timeOffset > 0 ? `+${timeOffset}` : timeOffset}`;
    },
    [],
  );

  return (
    <li className={styles.card}>
      <div className={styles['card-header']}>
        <span className="text text_type_digits-default">
          {`#${card.number}`}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          {formatDate(card.createdAt)}
        </span>
      </div>
      <h2 className="mt-6 mb-6">{card.name}</h2>
      <div className={styles['card-bottom']}>
        <div className={styles.ingredients}>
          {card.ingredients.map((ingredient, i, arr) => (
            <OrderCardIngredients key={ingredient._id} ingredient={ingredient} i={i} arr={arr} />
          ))}
        </div>
        <div className={`${styles.price} text text_type_digits-default`}>
          <span className={styles['price-value']}>{card.totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export default OrderCard;
