import React, { forwardRef } from 'react';
import Ingredient from '../ingredient/ingredient';
import styles from './ingredients-category.module.css';
import { TIngredient } from '../../services/types/data';

type TIngredientsCategory = {
  cards: ReadonlyArray<TIngredient>;
  title: string;
};

const IngredientsCategory = forwardRef<HTMLDivElement, TIngredientsCategory>(
  ({ cards, title }, ref) => (
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
  ),
);

export default IngredientsCategory;
