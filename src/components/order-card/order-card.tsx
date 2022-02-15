import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import OrderCardIngredients from '../order-card-ingredients/order-card-ingredients';
import { TOrderUpdatedCard } from '../../services/types/data';
import { useLocation } from '../../services/hooks';

type TOrderCard = {
  card: TOrderUpdatedCard
};

const OrderCard: FC<TOrderCard> = ({ card }) => {
  const location = useLocation();

  return (
    <li className={styles.card}>
      <Link className={styles.link} to={{ pathname: `${location.pathname}/${card._id}`, state: { background: location } }}>
        <div className={styles['card-header']}>
          <span className="text text_type_digits-default">
            {`#${card.number}`}
          </span>
          <span className="text text_type_main-default text_color_inactive">
            {card.createdAt}
          </span>
        </div>
        <h2 className="mt-6 mb-6">{card.name}</h2>
        <div className={styles['card-bottom']}>
          <div className={styles.ingredients}>
            {card.ingredients.map((ingredient, i, arr) => (
              <OrderCardIngredients key={`${ingredient._id}${i * 2}`} ingredient={ingredient} i={i} arr={arr} />
            ))}
          </div>
          <div className={`${styles.price} text text_type_digits-default`}>
            <span className={styles['price-value']}>{card.totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderCard;
