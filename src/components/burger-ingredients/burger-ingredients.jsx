import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { ingredientsData } from '../../utils/constants';
import styles from './burger-ingredients.module.css';

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'buns',
    };
  }

  handleTabClick = (value) => {
    this.setState({current: value})
  }

  render() {
    return (
      <section className={styles["burger-ingredients"]}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <div className={styles.tab}>
          <Tab value="buns" active={this.state.current === 'buns'} onClick={this.handleTabClick}>
            Булки
          </Tab>
          <Tab value="sauces" active={this.state.current === 'sauces'} onClick={this.handleTabClick}>
            Соусы
          </Tab>
          <Tab value="main" active={this.state.current === 'main'} onClick={this.handleTabClick}>
            Начинки
          </Tab>
        </div>
        <div className={styles.content}>
          <IngredientsCategory title="Булки" cards={ingredientsData}  />
        </div>
      </section>
    );
  }
}


export default BurgerIngredients;
