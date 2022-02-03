import React, { FC } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './bun-constructor-element.module.css';
import { TConstructorElement } from '../../services/types/ui-components';

type TBunConstructorElement = Omit<TConstructorElement, 'isLocked' | 'handleClose'> & { className?: string | null };

const BunConstructorElement: FC<TBunConstructorElement> = ({
  className,
  type,
  text,
  price,
  thumbnail,
}) => (
  <li className={`${className} ${styles['list-item']}`}>
    <ConstructorElement
      type={type}
      isLocked
      text={text + (type === 'top' ? ' (верх)' : ' (низ)')}
      price={price}
      thumbnail={thumbnail}
    />
  </li>
);

BunConstructorElement.defaultProps = {
  className: null,
};

export default BunConstructorElement;
