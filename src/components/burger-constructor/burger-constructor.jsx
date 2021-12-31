import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BunConstructorElement from '../bun-constructor-element/bun-constructor-element';
import MainConstructorElement from '../main-constructor-element/main-constructor-element';
import styles from './burger-constructor.module.css';
import {
  addIngredient, REPLACE_BUN_IN_CONSTRUCTOR, RESET_CONSTRUCTOR,
} from '../../services/actions/burger-constructor';
import { INCREASE_INGREDIENT, DECREASE_INGREDIENT, RESET_INGREDIENT_COUNT } from '../../services/actions/burger-ingredients';
import { getOrderDetails, OPEN_ERROR_POPUP } from '../../services/actions/popups';
import {
  BUN_REQUIRED_ERR_MSG,
  CONSTRUCTOR_DEFAULT_TEXT,
  CONSTRUCTOR_BUTTON_TEXT,
  CONSTRUCTOR_LOADING_BUTTON_TEXT,
} from '../../utils/constants';
import ModalLoader from '../modal-loader/modal-loader';

function BurgerConstructor() {
  const {
    mainIngredients, draggingMainIngredients, bun, totalPrice,
  } = useSelector((state) => state.burgerConstructor);
  const { orderRequest, orderDetailsContent } = useSelector((store) => store.popups);
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
    if (!bun._id) {
      return dispatch({ type: OPEN_ERROR_POPUP, payload: { message: BUN_REQUIRED_ERR_MSG } });
    }
    dispatch({ type: INCREASE_INGREDIENT, payload: item });
    return dispatch(addIngredient(item));
  };

  useEffect(() => {
    if (!Object.keys(orderDetailsContent).length) {
      return;
    }
    dispatch({ type: RESET_CONSTRUCTOR });
    dispatch({ type: RESET_INGREDIENT_COUNT });
  }, [orderDetailsContent]);

  const clickOrderBtn = () => {
    dispatch(getOrderDetails([bun, ...mainIngredients].map((ingr) => ingr._id)));
  };

  const targetList = draggingMainIngredients.length ? draggingMainIngredients : mainIngredients;

  return (
    <section
      className={
        `${styles.constructor}
        ${isOver && styles.constructor_active}
        ${!bun._id && styles.constructor_epmty}
        mt-10 pt-15 pb-15 pl-4 pr-4`
      }
      ref={dropTarget}
    >
      {
        totalPrice
          ? (
            <>
              <ul className={`${styles['order-list']}`}>
                <BunConstructorElement
                  className="pl-8"
                  pos="top"
                  name={bun.name}
                  price={bun.price}
                  image={bun.image_mobile}
                />
                {
                  mainIngredients.length ? (
                    <ul className={`${styles['order-list']} ${styles['order-list-main']} pr-2`}>
                      {targetList.map((card) => (
                        <MainConstructorElement
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
                <BunConstructorElement
                  className="pl-8"
                  pos="bottom"
                  name={bun.name}
                  price={bun.price}
                  image={bun.image_mobile}
                />
              </ul>
              <div className={`${styles['info-container']} mt-10 mr-4`}>
                <p className={`${styles.price} text text_type_digits-medium mr-10`}>
                  <span className="mr-2">{totalPrice}</span>
                  <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="large" onClick={clickOrderBtn} disabled={orderRequest}>
                  {orderRequest ? CONSTRUCTOR_LOADING_BUTTON_TEXT : CONSTRUCTOR_BUTTON_TEXT}
                </Button>
              </div>
              {orderRequest && <ModalLoader />}
            </>
          )
          : (
            <p className={`${styles['background-text']} text text_type_main-medium`}>{CONSTRUCTOR_DEFAULT_TEXT}</p>
          )
      }
    </section>
  );
}

export default BurgerConstructor;
