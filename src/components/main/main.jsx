import React from 'react';
import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function Main() {
  return (
    <main className={`${styles.main}`}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default Main;
