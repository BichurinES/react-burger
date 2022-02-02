import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BunConstructorElement from '../bun-constructor-element/bun-constructor-element';
import MainConstructorElement from '../main-constructor-element/main-constructor-element';
import styles from './burger-constructor.module.css';
import {
  addIngredientToConstructor, replaceBunInConstructor, resetConstructor,
} from '../../services/actions/burger-constructor';
import { increaseIngredient, decreaseIngredient, resetIngredientsCount } from '../../services/actions/burger-ingredients';
import { getOrderDetails, openErrorPopup } from '../../services/actions/popups';
import {
  BUN_REQUIRED_ERR_MSG,
  CONSTRUCTOR_DEFAULT_TEXT,
  CONSTRUCTOR_BUTTON_TEXT,
  CONSTRUCTOR_LOADING_BUTTON_TEXT,
} from '../../utils/constants';
import ModalLoader from '../modal-loader/modal-loader';
import useToken from '../../services/token';
import { useDispatch, useSelector } from '../../services/hooks';
import { TIngredient } from '../../services/types/data';

const BurgerConstructor = () => {
  const { refreshToken } = useToken();
  const history = useHistory();
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
    drop(card: TIngredient) {
      onDropHandler(card);
    },
  });

  const onDropHandler = (item: TIngredient) => {
    if (bun && item._id === bun._id) {
      return null;
    }
    if (item.type === 'bun') {
      if (bun) {
        dispatch(decreaseIngredient(bun));
      }
      dispatch(replaceBunInConstructor(item));
      dispatch(increaseIngredient({ _id: item._id }));
      return item;
    }
    if (!bun) {
      dispatch(openErrorPopup({ message: BUN_REQUIRED_ERR_MSG }));
      return null;
    }
    dispatch(increaseIngredient({ _id: item._id }));
    dispatch(addIngredientToConstructor(item));
    return item;
  };

  useEffect(() => {
    if (!orderDetailsContent) {
      return;
    }
    dispatch(resetConstructor());
    dispatch(resetIngredientsCount());
  }, [orderDetailsContent]);

  const clickOrderBtn = () => {
    if (refreshToken && bun) {
      return dispatch(getOrderDetails([bun, ...mainIngredients].map((ingr) => ingr._id)));
    }
    return history.push('/login');
  };

  const targetList = draggingMainIngredients.length ? draggingMainIngredients : mainIngredients;

  return (
    <section
      className={
        `${styles.constructor}
        ${isOver && styles.constructor_active}
        ${!bun && styles.constructor_epmty}
        mt-10 pt-15 pb-15 pl-4 pr-4`
      }
      ref={dropTarget}
    >
      {
        bun
          ? (
            <>
              <ul className={`${styles['order-list']}`}>
                <BunConstructorElement
                  className="pl-8"
                  type="top"
                  text={bun.name}
                  price={bun.price}
                  thumbnail={bun.image_mobile}
                />
                {
                  mainIngredients.length ? (
                    <ul className={`${styles['order-list']} ${styles['order-list-main']} pr-2`}>
                      {targetList.map((card) => (
                        <MainConstructorElement
                          key={card._cartId}
                          _id={card._id}
                          _cartId={card._cartId}
                          text={card.name}
                          price={card.price}
                          thumbnail={card.image_mobile}
                        />
                      ))}
                    </ul>
                  ) : null
                }
                <BunConstructorElement
                  className="pl-8"
                  type="bottom"
                  text={bun.name}
                  price={bun.price}
                  thumbnail={bun.image_mobile}
                />
              </ul>
              <div className={`${styles['info-container']} mt-10 mr-4`}>
                <p className={`${styles.price} text text_type_digits-medium mr-10`}>
                  <span className="mr-2">{totalPrice}</span>
                  <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="large" onClick={clickOrderBtn}>
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
};

export default BurgerConstructor;
