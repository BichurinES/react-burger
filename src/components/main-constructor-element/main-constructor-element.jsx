/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './main-constructor-element.module.css';
import {
  updateConstructorFromDraggingContainer,
  removeIngredientFromConstructor,
  copyConstructorToDraggingContainer,
  replaceItemsInDraggingContainer,
  resetDraggingContainer,
} from '../../services/actions/burger-constructor';
import { decreaseIngredient } from '../../services/actions/burger-ingredients';

function MainConstructorElement({
  name, price, image, _cartId, _id,
}) {
  const { draggingMainIngredients } = useSelector((state) => state.burgerConstructor);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor',
    item: () => {
      dispatch(copyConstructorToDraggingContainer());
      return { _cartId };
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end(item, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        dispatch(updateConstructorFromDraggingContainer());
      }
      dispatch(resetDraggingContainer());
    },
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

      const index = draggingMainIngredients.findIndex((ingred) => ingred._cartId === item._cartId);
      const hoverIndex = draggingMainIngredients.findIndex((ingred) => ingred._cartId === _cartId);

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverBottomBound = (hoverBoundingRect.bottom - hoverBoundingRect.top) * 0.2;
      const hoverTopBound = (hoverBoundingRect.bottom - hoverBoundingRect.top) * 0.8;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (
        (index < hoverIndex && hoverClientY >= hoverBottomBound)
        || (index > hoverIndex && hoverClientY <= hoverTopBound)
      ) {
        dispatch(replaceItemsInDraggingContainer({
          initialIndex: index,
          targetIndex: hoverIndex,
        }));
      }
    },
  });

  const handleDeleteElement = () => {
    dispatch(removeIngredientFromConstructor({ _cartId, price }));
    dispatch(decreaseIngredient({ _id }));
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

MainConstructorElement.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  _cartId: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};

export default MainConstructorElement;
