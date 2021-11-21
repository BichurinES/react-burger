import React from 'react';
import PropTypes from 'prop-types';
import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import filteredIngredientsType from '../../types/filtered-ingredients-type';

function Main(props) {
  const { openOrderDetails, openIngredientDetails, ...otherProps } = props;
  return (
    <main className={`${styles.main}`}>
      <BurgerIngredients openPopup={openIngredientDetails} {...otherProps}  />
      <BurgerConstructor openPopup={openOrderDetails} {...otherProps} />
    </main>
  );
}

Main.propTypes = {
  filteredIngredients: filteredIngredientsType.isRequired,
  openOrderDetails: PropTypes.func.isRequired,
  openIngredientDetails: PropTypes.func.isRequired,
}

export default Main;
