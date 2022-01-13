import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../types/ingredient-type';
import styles from './ingredient.module.css';
import { OPEN_INGREDIENT_DETAILS } from '../../services/actions/popups';

function Ingredient({ card }) {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: card,
  });

  const handleCardClick = () => {
    dispatch({
      type: OPEN_INGREDIENT_DETAILS,
      payload: card,
    });
  };

  const handleCardKeyDown = (e) => e.key === 'Enter' && handleCardClick();

  return (
    <li className={styles.card} ref={dragRef}>
      <div role="button" tabIndex={0} onClick={handleCardClick} onKeyDown={handleCardKeyDown}>
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
      </div>
    </li>
  );
}

Ingredient.propTypes = {
  card: ingredientType.isRequired,
};

export default Ingredient;
