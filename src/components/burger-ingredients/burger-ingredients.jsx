import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { ingredientsData } from '../../utils/constants';
import { filterIngredients } from '../../utils/utils';
import styles from './burger-ingredients.module.css';

const filteredData = filterIngredients(ingredientsData, ['bun', 'sauce', 'main']);

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');

  const handleTabClick = (value) => {
    setCurrent(value);
  };

  return (
    <section className={`${styles.container} pt-10`}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={`${styles.tab} mt-5 mb-10`}>
        <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={styles.content}>
        <IngredientsCategory title="Булки" cards={filteredData.bun} />
        <IngredientsCategory title="Соусы" cards={filteredData.sauce} />
        <IngredientsCategory title="Начинки" cards={filteredData.main} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
