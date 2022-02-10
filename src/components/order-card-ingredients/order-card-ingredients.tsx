import React, { FC, useMemo } from 'react';
import styles from './order-card-ingredients.module.css';
import { TFeedIngredient } from '../../services/types/data';
import { MAX_INGREDIETNS_IN_CARD } from '../../utils/constants';

type TOrderCardIngredients = {
  ingredient: TFeedIngredient;
  i: number;
  arr: Array<TFeedIngredient>;
};

const OrderCardIngredients: FC<TOrderCardIngredients> = ({ ingredient, i, arr }) => {
  const isLast = useMemo(
    () => (i === (MAX_INGREDIETNS_IN_CARD - 1)) && (arr.length > MAX_INGREDIETNS_IN_CARD),
    [i, arr],
  );

  return (
    i >= 6 ? null : (
      <div className={styles.ingredient} style={{ zIndex: MAX_INGREDIETNS_IN_CARD + 1 - i }}>
        <div className={`${styles['ingredient-background']} ${isLast ? styles['ingredient-background_last'] : ''}`}>
          <img
            className={`${styles['ingredient-image']} ${isLast ? styles['ingredient-image_last'] : ''}`}
            src={ingredient.image_mobile}
            alt={ingredient.name}
          />
        </div>
        {isLast
          ? (
            <span className={`${styles['image-count']} text text_type_main-default`}>
              {`+${arr.length - MAX_INGREDIETNS_IN_CARD}`}
            </span>
          )
          : null}
      </div>
    ));
};

export default OrderCardIngredients;
