import React from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../types/ingredient-type';
import styles from './ingredient-details.module.css';
import Modal from '../modal/modal';

function IngredientDetails({ ingredient, closeAllPopups }) {
  return (
    <Modal title={"Детали ингредиента"} closeAllPopups={closeAllPopups}>
      <img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
      <h3 className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</h3>
      <ul className={`${styles.nutrition} text text_type_main-default text_color_inactive mb-15`}>
        <li className={styles.component}>
          <span className="mb-2">Калории,ккал</span>
          <span className="text text_type_digits-default">{ingredient.calories}</span>
        </li>
        <li className={styles.component}>
          <span className="mb-2">Белки, г</span>
          <span className="text text_type_digits-default">{ingredient.proteins}</span>
        </li>
        <li className={styles.component}>
          <span className="mb-2">Жиры, г</span>
          <span className="text text_type_digits-default">{ingredient.fat}</span>
        </li>
        <li className={styles.component}>
          <span className="mb-2">Углеводы, г</span>
          <span className="text text_type_digits-default">{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </Modal>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientType.isRequired,
  closeAllPopups: PropTypes.func.isRequired,
}

export default IngredientDetails;
