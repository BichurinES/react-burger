import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../types/ingredient-type';
import styles from './ingredient.module.css';
import { PopupControlContext } from '../../contexts/appContext';

function Ingredient({ card, i }) {
  const { openIngredientDetails } = React.useContext(PopupControlContext);

  const handleCardClick = () => {
    openIngredientDetails(card);
  };

  const handleCardKeyDown = (e) => e.key === 'Enter' && openIngredientDetails(card);

  return (
    <li className={styles.card}>
      <div role="button" tabIndex={0} onClick={handleCardClick} onKeyDown={handleCardKeyDown}>
        <img src={card.image} alt={card.name} className={styles.image} />
        <p className={`${styles.price} text text_type_digits-default mt-2 mb-2`}>
          <span className="mr-2">{card.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={`${styles.name} text text_type_main-default`}>{card.name}</p>
        <div className={`${styles.counter} ${i === 0 ? styles.counter_active : null}`}>
          <Counter count={1} size="default" />
        </div>
      </div>
    </li>
  );
}

Ingredient.propTypes = {
  card: ingredientType.isRequired,
  i: PropTypes.number.isRequired,
};

export default Ingredient;
