import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';
import ingredientsListType from '../../types/ingredients-list-type';
import styles from './ingredients-category.module.css';

const IngredientsCategory = forwardRef(({ cards, title }, ref) => (
  <div className={styles.container}>
    <h2 className="text text_type_main-medium" ref={ref}>{title}</h2>
    {
      cards && (
        <ul className={`${styles.list} mt-6 mb-10 ml-4 mr-4`}>
          {cards.map((card) => <Ingredient key={card._id} card={card} />)}
        </ul>
      )
    }
  </div>
));

IngredientsCategory.defaultProps = {
  cards: null,
};

IngredientsCategory.propTypes = {
  cards: ingredientsListType,
  title: PropTypes.string.isRequired,
};

export default IngredientsCategory;
