import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../types/ingredient-type';
import styles from './ingredient.module.css';

class Ingredient extends React.Component {
  render() {
    return (
      <li className={styles.card}>
        <img src={this.props.card.image} alt={this.props.card.name} className={styles.image} />
        <p className={`${styles.price} text text_type_digits-default mt-2 mb-2`}>
          <span className="mr-2">{this.props.card.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={`${styles.name} text text_type_main-default`}>{this.props.card.name}</p>
        <div className={`${styles.counter} ${this.props.i === 0 ? styles["counter_active"] : null}`}>
          <Counter count={1} size="default" />
        </div>
      </li>
    );
  }
}

Ingredient.propTypes = {
  card: ingredientType.isRequired,
  i: PropTypes.number.isRequired,
}

export default Ingredient;
