import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BunElement from '../bun-element/bun-element';
import MainElement from '../main-element/main-element';
import styles from './burger-constructor.module.css';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR, REPLACE_BUN_IN_CONSTRUCTOR,
} from '../../services/actions/burger-constructor';
import { getOrderDetails } from '../../services/actions/popups';

function BurgerConstructor() {
  const {
    main, bun, totalPrice,
  } = useSelector((state) => state.burgerConstructor);
  const { ingredients } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  const clickOrderBtn = () => {
    dispatch(getOrderDetails([bun, ...main].map((ingr) => ingr._id)));
  };

  useEffect(() => {
    if (ingredients.length) {
      dispatch({
        type: REPLACE_BUN_IN_CONSTRUCTOR,
        payload: ingredients.find((elem) => elem.type === 'bun'),
      });
      dispatch({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: ingredients.find((elem) => elem.type === 'sauce'),
      });
      dispatch({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: ingredients.find((elem) => elem.type === 'main'),
      });
      dispatch({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: ingredients.find((elem) => elem.type === 'main'),
      });
    }
  }, [ingredients]);

  return (
    <section className="pt-25 pl-4">
      {
        totalPrice
          ? (
            <ul className={`${styles['order-list']}`}>
              <BunElement
                className="pl-8"
                pos="top"
                name={bun.name}
                price={bun.price}
                image={bun.image_mobile}
              />
              {
                main.length ? (
                  <ul className={`${styles['order-list']} ${styles['order-list-main']} pr-2`}>
                    {main.map((card) => (
                      <MainElement
                        key={card._cartId}
                        _id={card._id}
                        _cartId={card._cartId}
                        name={card.name}
                        price={card.price}
                        image={card.image_mobile}
                      />
                    ))}
                  </ul>
                ) : null
              }
              <BunElement
                className="pl-8"
                pos="bottom"
                name={bun.name}
                price={bun.price}
                image={bun.image_mobile}
              />
            </ul>
          )
          : null
      }
      <div className={`${styles['info-container']} mt-10 mr-4`}>
        <p className={`${styles.price} text text_type_digits-medium mr-10`}>
          <span className="mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large" onClick={clickOrderBtn}>Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
