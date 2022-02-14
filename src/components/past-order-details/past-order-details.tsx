import React, { useMemo } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './past-order-details.module.css';
import { useSelector } from '../../services/hooks';
import { TFeedIngredient } from '../../services/types/data';
import { FEED_ID_PATH, PROFILE_ORDERS_ID_PATH } from '../../utils/constants';

const PastOrderDetails = () => {
  const { path } = useRouteMatch();
  const { id } = useParams<{ id: string }>();
  const order = useSelector((state) => {
    if (path === FEED_ID_PATH) {
      return state.ws.feed?.orders.find((feedOrder) => feedOrder._id === id);
    }
    if (path === PROFILE_ORDERS_ID_PATH) {
      return state.ws.userOrders?.orders.find((userOrder) => userOrder._id === id);
    }
    return null;
  });

  const formatedIngredients = useMemo(
    () => {
      if (!order) {
        return [];
      }
      const res: Array<TFeedIngredient & { qty: number }> = [];
      order.ingredients.forEach((ingredient) => {
        if (ingredient.type === 'bun' && res.length) {
          return;
        }
        if (ingredient.type === 'bun') {
          res.push({ ...ingredient, qty: 2 });
          return;
        }
        const foundIngredientIndex = res
          .findIndex((redIngredient) => (redIngredient._id === ingredient._id));

        if (foundIngredientIndex !== -1) {
          res[foundIngredientIndex].qty += 1;
          return;
        }
        res.push({ ...ingredient, qty: 1 });
      });
      return res;
    },
    [order],
  );

  if (!order) {
    return null;
  }

  const {
    createdAt, name, number, status, totalPrice,
  } = order;

  return (
    <div className={styles.container}>
      <p className={`${styles.number} text text_type_digits-default`}>{`#${number}`}</p>
      <h2 className="text text_type_main-medium mt-10 mb-3">{name}</h2>
      <p className={`${styles.status} text text_type_main-default`}>{status === 'done' ? 'Выполнен' : 'Готовится'}</p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      <ul className={`${styles.list} pr-6`}>
        {formatedIngredients.map(({
          _id, image_mobile, name: ingrName, price, qty,
        }) => (
          <li key={_id} className={styles.ingredient}>
            <div className={styles['ingredient-border']}>
              <img
                className={styles['ingredient-image']}
                src={image_mobile}
                alt={ingrName}
              />
            </div>
            <p className={`${styles['ingredient-name']} text text_type_main-default ml-4`}>
              {ingrName}
            </p>
            <span className="text text_type_digits-default ml-4">{`${qty} x ${price}`}</span>
            <CurrencyIcon type="primary" />
          </li>
        ))}
      </ul>
      <div className={`${styles.bottom} mt-10 mb-20`}>
        <span className="text text_type_main-default text_color_inactive">{createdAt}</span>
        <span className={`${styles['total-price']} text text_type_digits-default mr-2`}>{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default PastOrderDetails;
