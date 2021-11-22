import React from 'react';
import PropTypes from 'prop-types';
import filteredIngredientsType from '../../types/filtered-ingredients-type';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BunElement from '../bun-element/bun-element';
import MainElement from '../main-element/main-element';
import styles from './burger-constructor.module.css';

function BurgerConstructor({ filteredIngredients, openPopup }) {
  const [totalPrice, setTotalPrice] = React.useState(0);
  const defaultBun = React.useMemo(() => filteredIngredients.bun ? filteredIngredients.bun[0] : [], 
    [filteredIngredients]
  );

  const clickOrderBtn = () => {
    openPopup('034536');
  }
  
  React.useEffect(() => {
    Object.keys(filteredIngredients).length &&
    setTotalPrice(
      [defaultBun, ...filteredIngredients.main, defaultBun].reduce(((sum, item) => sum += item.price), 0)
    );
  }, [filteredIngredients, defaultBun]);

  return (
    <section className={`pt-25 pl-4`}>
      {
        Object.keys(filteredIngredients).length &&
        (
          <ul className={`${styles["order-list"]}`}>
            <BunElement
              className="pl-8"
              pos="top"
              name={defaultBun.name}
              price={defaultBun.price}
              image={defaultBun["image_mobile"]}
            />
            <ul className={`${styles["order-list"]} ${styles["order-list-main"]} pr-2`}>
              {filteredIngredients.main.map(card => (
                <MainElement
                  key={card._id}
                  name={card.name}
                  price={card.price}
                  image={card["image_mobile"]}
                />
              ))}
            </ul>
            <BunElement
              className="pl-8"
              pos="bottom"
              name={defaultBun.name}
              price={defaultBun.price}
              image={defaultBun["image_mobile"]}
            />
          </ul>
        )
      }
      <div className={`${styles["info-container"]} mt-10 mr-4`}>
        <p className={`${styles.price} text text_type_digits-medium mr-10`}>
          <span className="mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large" onClick={clickOrderBtn}>Оформить заказ</Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  filteredIngredients: filteredIngredientsType.isRequired,
  openPopup: PropTypes.func.isRequired,
}

export default BurgerConstructor;
