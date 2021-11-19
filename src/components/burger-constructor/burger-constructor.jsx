import React from 'react';
import filteredIngredientsType from '../../types/filtered-ingredients-type';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BunElement from '../bun-element/bun-element';
import MainElement from '../main-element/main-element';
import styles from './burger-constructor.module.css';

function BurgerConstructor({ filteredIngredients }) {
  const [totalPrice, setTotalPrice] = React.useState(0);
  
  React.useEffect(() => {
    Object.keys(filteredIngredients).length &&
    setTotalPrice(
      [filteredIngredients.bun[0], ...filteredIngredients.main, filteredIngredients.bun[0]].reduce(((sum, item) => sum += item.price), 0)
    );
  }, [filteredIngredients]);

  return (
    <section className={`${styles.container} pt-25 pl-4`}>
      {
        Object.keys(filteredIngredients).length &&
        (
          <ul className={`${styles["order-list"]}`}>
            <BunElement className="pl-8" pos="top" card={filteredIngredients.bun[0]} />
            <ul className={`${styles["order-list"]} ${styles["order-list-main"]} pr-2`}>
              {filteredIngredients.main.map(card => <MainElement card={card} key={card._id} />)}
            </ul>
            <BunElement className="pl-8" pos="bottom" card={filteredIngredients.bun[0]} />
          </ul>
        )
      }
      <div className={`${styles["info-container"]} mt-10 mr-4`}>
        <p className={`${styles.price} text text_type_digits-medium mr-10`}>
          <span className="mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  filteredIngredients: filteredIngredientsType.isRequired,
}

export default BurgerConstructor;
