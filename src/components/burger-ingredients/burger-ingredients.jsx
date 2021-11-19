import React from 'react';
import styles from './burger-ingredients.module.css';
import filteredIngredientsType from '../../types/filtered-ingredients-type';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { filtrationKeys } from '../../utils/constants';

function BurgerIngredients({ filteredIngredients }) {
  const [current, setCurrent] = React.useState(filtrationKeys[0]);
  
  const handleTabClick = (value) => {
    setCurrent(value);
  };

  return (
    <section className={`${styles.container} pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`${styles.tab} mt-5 mb-10`}>
        <Tab value="bun" active={current === filtrationKeys[0]} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === filtrationKeys[1]} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={current === filtrationKeys[2]} onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={styles.content}>
        <IngredientsCategory title="Булки" cards={filteredIngredients[filtrationKeys[0]]} />
        <IngredientsCategory title="Соусы" cards={filteredIngredients[filtrationKeys[1]]} />
        <IngredientsCategory title="Начинки" cards={filteredIngredients[filtrationKeys[2]]} />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  filteredIngredients: filteredIngredientsType.isRequired,
}

export default BurgerIngredients;
