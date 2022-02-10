import React, { FC, useCallback, useMemo } from 'react';
import styles from './orders.module.css';
import { useSelector } from '../../services/hooks';
import OrderCard from '../order-card/order-card';
import {
  TOrderCard, TOrderUpdatedCard, TFeedIngredient,
} from '../../services/types/data';

type TOrders = {
  ordersData: ReadonlyArray<TOrderCard>
};

const Orders: FC<TOrders> = ({ ordersData }) => {
  const { ingredients } = useSelector((state) => state.ingredients);

  const getCardData = useCallback(
    (card: TOrderCard): TOrderUpdatedCard => {
      const updatedCard = { ...card, totalPrice: 0 };
      const updatedIngredients: Array<TFeedIngredient> = [];

      [...updatedCard.ingredients].forEach((ingredient) => {
        const fullIngredientData = ingredients.find(({ _id }) => _id === ingredient);

        if (fullIngredientData) {
          updatedCard.totalPrice += fullIngredientData.price;
          updatedIngredients.push({
            _id: ingredient,
            price: fullIngredientData.price,
            name: fullIngredientData.name,
            image_mobile: fullIngredientData.image_mobile,
          });
        }
      });

      return { ...updatedCard, ingredients: [...updatedIngredients] };
    },
    [ingredients],
  );

  const updatedData = useMemo(() => ordersData.map(getCardData), [getCardData, ordersData]);

  return (
    <ul className={styles.list}>
      {updatedData.map((card) => (
        <OrderCard key={card._id} card={card} />
      ))}
    </ul>
  );
};

export default Orders;
