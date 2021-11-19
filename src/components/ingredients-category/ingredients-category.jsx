import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';
import ingredientType from '../../types/ingredient-type';
import styles from './ingredients-category.module.css';

function IngredientsCategory({ cards, title }) {
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium">{title}</h2>
        <ul className={`${styles.list} mt-6 mb-10 ml-4 mr-4`}>
          {cards.map((card, i) => <Ingredient key={card._id} i={i} card={card} />)}
        </ul>
    </div>
  );
}

IngredientsCategory.propTypes = {
  cards: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  title: PropTypes.string.isRequired,
}

export default IngredientsCategory;
