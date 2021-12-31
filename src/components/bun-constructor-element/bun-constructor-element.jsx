import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './bun-constructor-element.module.css';

function BunConstructorElement({
  className,
  pos,
  name,
  price,
  image,
}) {
  return (
    <li className={`${className} ${styles['list-item']}`}>
      <ConstructorElement
        type={pos}
        isLocked
        text={name + (pos === 'top' ? ' (верх)' : ' (низ)')}
        price={price}
        thumbnail={image}
      />
    </li>
  );
}

BunConstructorElement.defaultProps = {
  className: null,
};

BunConstructorElement.propTypes = {
  className: PropTypes.string,
  pos: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default BunConstructorElement;
