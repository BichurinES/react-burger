import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BunElement from '../bun-element/bun-element';
import MainElement from '../main-element/main-element';
import styles from './burger-constructor.module.css';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR, REPLACE_BUN_IN_CONSTRUCTOR,
} from '../../services/actions/burger-constructor';
import { INCREASE_INGREDIENT, DECREASE_INGREDIENT } from '../../services/actions/burger-ingredients';
import { getOrderDetails } from '../../services/actions/popups';
import ModalLoader from '../modal-loader/modal-loader';

function BurgerConstructor() {
  const {
    main, bun, totalPrice,
  } = useSelector((state) => state.burgerConstructor);
  const { orderRequest } = useSelector((store) => store.popups);
  const dispatch = useDispatch();
  const [{ isOver }, dropTarget] = useDrop({
    accept: 'ingredients',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop(card) {
      onDropHandler(card);
    },
  });

  const onDropHandler = (item) => {
    if (item._id === bun._id) {
      return item;
    }
    if (item.type === 'bun') {
      dispatch({ type: DECREASE_INGREDIENT, payload: bun });
      dispatch({ type: INCREASE_INGREDIENT, payload: item });
      return dispatch({ type: REPLACE_BUN_IN_CONSTRUCTOR, payload: item });
    }
    dispatch({ type: INCREASE_INGREDIENT, payload: item });
    return dispatch({ type: ADD_INGREDIENT_TO_CONSTRUCTOR, payload: item });
  };

  const clickOrderBtn = () => {
    dispatch(getOrderDetails([bun, ...main].map((ingr) => ingr._id)));
  };

  return (
    <section className={`${isOver && styles.constructor_active} mt-10 pt-15 pb-15 pl-4 pr-4`} ref={dropTarget}>
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
        <Button type="primary" size="large" onClick={clickOrderBtn} disabled={orderRequest}>{orderRequest ? 'Оформляем...' : 'Оформить заказ'}</Button>
      </div>
      {orderRequest && <ModalLoader />}
    </section>
  );
}

export default BurgerConstructor;
