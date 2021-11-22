import React from 'react';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';
import ingredientsListType from '../../types/ingredients-list-type';
import styles from './ingredients-category.module.css';

const IngredientsCategory = React.forwardRef(({ cards, title, openPopup }, ref) => {
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium" ref={ref}>{title}</h2>
        {
          cards && (
            <ul className={`${styles.list} mt-6 mb-10 ml-4 mr-4`}>
              {cards.map((card, i) => <Ingredient key={card._id} i={i} card={card} openPopup={openPopup} />)}
            </ul>
          )
        }
    </div>
  );
});

IngredientsCategory.propTypes = {
  cards: ingredientsListType,
  title: PropTypes.string.isRequired,
  openPopup: PropTypes.func.isRequired,
}

export default IngredientsCategory;
