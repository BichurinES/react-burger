import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients-category.module.css';

class IngredientsCategory extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>{this.state.title}</h2>
        <ul>
          {this.state.cards.map(card => (
            <li>
              <img src={card.image} alt={card.name} className={styles.image} />
              <p className={styles.price}>
                <CurrencyIcon type="primary" />
                {card.price}
              </p>
              <p className={styles.name}>{card.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default IngredientsCategory;
