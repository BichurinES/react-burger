import React from 'react';
import PropTypes from 'prop-types';
import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import filteredIngredientsType from '../../types/filtered-ingredients-type';

function Main(props) {
  return (
    <main className={`${styles.main}`}>
      <BurgerIngredients {...props}  />
      <BurgerConstructor {...props} />
    </main>
  );
}

Main.propTypes = {
  filteredIngredients: filteredIngredientsType.isRequired,
  openPopup: PropTypes.func.isRequired,
}

export default Main;
