/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { useSelector } from '../../services/hooks';

const IngredientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const ingredient = useSelector((state) => (
    state.ingredients.ingredients.find(({ _id }) => id === _id)
  ));
  const {
    image_large,
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
  } = ingredient || {};
  return (
    <>
      <img src={image_large} alt={name} className={styles.image} />
      <h3 className={`${styles.title} text text_type_main-medium mt-4 mb-8`}>{name}</h3>
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
    </>
  );
};

export default IngredientDetails;
