import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './main.module.css';

class Main extends React.Component {
  render() {
    return (
      <main className={`${styles.main} pt-4 pb-4`}>
        <BurgerIngredients />
      </main>
    );
  }
}


export default Main;
