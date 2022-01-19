import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../types/ingredient-type';
import styles from './ingredient.module.css';

function Ingredient({ card }) {
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: card,
  });

  return (
    <li ref={dragRef}>
      <Link className={styles.card} to={{ pathname: `/ingredients/${card._id}`, state: { background: location, id: card._id } }}>
        <img src={card.image} alt={card.name} className={styles.image} />
        <p className={`${styles.price} text text_type_digits-default mt-2 mb-2`}>
          <span className="mr-2">{card.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={`${styles.name} text text_type_main-default`}>{card.name}</p>
        {
          card.qty
            ? (
              <div className="styles.counter styles.counter_active">
                <Counter count={card.qty} size="default" />
              </div>
            )
            : null
        }
      </Link>
    </li>
  );
}

Ingredient.propTypes = {
  card: ingredientType.isRequired,
};

export default Ingredient;
