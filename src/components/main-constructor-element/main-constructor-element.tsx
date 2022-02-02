/* eslint-disable no-unused-vars */
import React, { useRef, FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
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
import { useDispatch, useSelector } from '../../services/hooks';
import { TConstructorElement } from '../../services/types/ui-components';
import { TMainIngredient } from '../../services/types/data';

type TMainConstructorElement = Pick<TConstructorElement, 'text' | 'price' | 'thumbnail'>
& Pick<TMainIngredient, '_cartId' | '_id'>;

const MainConstructorElement: FC<TMainConstructorElement> = ({
  text, price, thumbnail, _cartId, _id,
}) => {
  const { draggingMainIngredients } = useSelector((state) => state.burgerConstructor);
  const ref = useRef<HTMLLIElement>(null);
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
    hover(item: { _cartId: string }, monitor) {
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
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

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
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={handleDeleteElement}
      />
    </li>
  );
};

export default MainConstructorElement;
