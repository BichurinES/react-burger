/* eslint-disable camelcase */
import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';
import Modal from '../modal/modal';

function IngredientDetails() {
  const {
    image_large,
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
  } = useSelector((state) => state.popups.ingredientDetailsContent);

  return (
    <Modal title="Детали ингредиента">
      <img src={image_large} alt={name} className={styles.image} />
      <h3 className="text text_type_main-medium mt-4 mb-8">{name}</h3>
      <ul className={`${styles.nutrition} text text_type_main-default text_color_inactive mb-15`}>
        <li className={styles.component}>
          <span className="mb-2">Калории,ккал</span>
          <span className="text text_type_digits-default">{calories}</span>
        </li>
        <li className={styles.component}>
          <span className="mb-2">Белки, г</span>
          <span className="text text_type_digits-default">{proteins}</span>
        </li>
        <li className={styles.component}>
          <span className="mb-2">Жиры, г</span>
          <span className="text text_type_digits-default">{fat}</span>
        </li>
        <li className={styles.component}>
          <span className="mb-2">Углеводы, г</span>
          <span className="text text_type_digits-default">{carbohydrates}</span>
        </li>
      </ul>
    </Modal>
  );
}

export default IngredientDetails;
