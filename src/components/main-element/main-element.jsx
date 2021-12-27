/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './main-element.module.css';
import {
  UPDATE_CONSTRUCTOR_FROM_DRAGGING_CONTAINER,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  COPY_CONSTRUCTOR_TO_DRAGGING_CONTAINER,
  REPLACE_ITEMS_IN_DRAGGING_CONTAINER,
  RESET_DRAGGING_CONTAINER,
} from '../../services/actions/burger-constructor';
import { DECREASE_INGREDIENT } from '../../services/actions/burger-ingredients';

function MainElement({
  name, price, image, _cartId, _id,
}) {
  const { main, draggingMain } = useSelector((state) => state.burgerConstructor);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor',
    item: () => {
      dispatch({ type: COPY_CONSTRUCTOR_TO_DRAGGING_CONTAINER });
      return { _cartId };
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: 'constructor',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      if (_cartId === item._cartId) {
        return;
      }

      const index = draggingMain.findIndex((ingred) => ingred._cartId === item._cartId);
      const hoverIndex = draggingMain.findIndex((ingred) => ingred._cartId === _cartId);

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (
        (index < hoverIndex && hoverClientY >= hoverMiddleY)
        || (index > hoverIndex && hoverClientY <= hoverMiddleY)
      ) {
        dispatch({
          type: REPLACE_ITEMS_IN_DRAGGING_CONTAINER,
          payload: {
            initialIndex: index,
            targetIndex: hoverIndex,
          },
        });
      }
    },
    drop() {
      dispatch({ type: UPDATE_CONSTRUCTOR_FROM_DRAGGING_CONTAINER });
      dispatch({ type: RESET_DRAGGING_CONTAINER });
    },
  });

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
  drag(drop(ref));

  return (
    <li className={`${styles['list-item']} ${isDragging && styles['list-item_dragging']} pl-8`} ref={ref}>
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
