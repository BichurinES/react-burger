import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './main-element.module.css';
import { REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/actions/burger-constructor';
import { DECREASE_INGREDIENT } from '../../services/actions/burger-ingredients';

function MainElement({
  name, price, image, _cartId, _id,
}) {
  const dispatch = useDispatch();
  const handleDeleteElement = () => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: { _cartId, price },
    });
    dispatch({
      type: DECREASE_INGREDIENT,
      payload: { _id },
    });
  };

  return (
    <li className={`${styles['list-item']} pl-8`}>
      <span className={`${styles.icon} mr-2`}><DragIcon type="primary" /></span>
      <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image}
        handleClose={handleDeleteElement}
      />
    </li>
  );
}

MainElement.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  _cartId: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};

export default MainElement;
