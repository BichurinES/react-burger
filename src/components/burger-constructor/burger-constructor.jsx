import React, {
  useState, useContext, useMemo, useEffect,
} from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BunElement from '../bun-element/bun-element';
import MainElement from '../main-element/main-element';
import styles from './burger-constructor.module.css';
import { BurgerConstructorContext, PopupControlContext } from '../../contexts/appContext';

function BurgerConstructor() {
  const [totalPrice, setTotalPrice] = useState(0);
  const { burger } = useContext(BurgerConstructorContext);
  const { openOrderDetails } = useContext(PopupControlContext);
  const currentBun = useMemo(() => (burger.bun ? burger.bun : {}), [burger]);

  const clickOrderBtn = () => {
    openOrderDetails('034536');
  };

  useEffect(() => {
    if (Object.keys(burger).length) {
      setTotalPrice(
        [currentBun, ...burger.main, currentBun].reduce(((sum, item) => {
          let result = sum;
          result += item.price;
          return result;
        }), 0),
      );
    }
  }, [burger, currentBun]);

  return (
    <section className="pt-25 pl-4">
      {
        Object.keys(burger).length
        && (
          <ul className={`${styles['order-list']}`}>
            <BunElement
              className="pl-8"
              pos="top"
              name={currentBun.name}
              price={currentBun.price}
              image={currentBun.image_mobile}
            />
            {
              burger.main.length ? (
                <ul className={`${styles['order-list']} ${styles['order-list-main']} pr-2`}>
                  {burger.main.map((card) => (
                    <MainElement
                      key={card._id}
                      id={card._id}
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
              name={currentBun.name}
              price={currentBun.price}
              image={currentBun.image_mobile}
            />
          </ul>
        )
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
