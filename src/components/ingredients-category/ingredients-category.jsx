import React from 'react';
import Ingredient from '../ingredient/ingredient';
import styles from './ingredients-category.module.css';

class IngredientsCategory extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h2 className="text text_type_main-medium">{this.props.title}</h2>
          <ul className={`${styles.list} mt-6 mb-10 ml-4 mr-4`}>
            {this.props.cards.map((card, i) => <Ingredient key={card._id} i={i} {...card} />)}
          </ul>
      </div>
    );
  }
}

export default IngredientsCategory;
