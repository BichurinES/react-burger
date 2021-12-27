import React from 'react';
import { useSelector } from 'react-redux';
import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Loader from '../loader/loader';

function Main() {
  const { ingredientsRequest } = useSelector((store) => store.ingredients);

  return (
    <main className={`${styles.main} ${ingredientsRequest && styles.main_loader}`}>
      {ingredientsRequest ? <Loader /> : (
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      )}
    </main>
  );
}

export default Main;
