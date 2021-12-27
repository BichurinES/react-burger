import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { filterIngredients } from '../../utils/utils';

function BurgerIngredients() {
  const { ingredients } = useSelector((state) => state.ingredients);

  const { bun, sauce, main } = filterIngredients(ingredients);
  const [current, setCurrent] = useState('bun');

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const handleTabClick = (value) => {
    let currentCategory = '';
    setCurrent(value);

    switch (value) {
      case 'bun':
        currentCategory = bunRef.current;
        break;
      case 'sauce':
        currentCategory = sauceRef.current;
        break;
      case 'main':
        currentCategory = mainRef.current;
        break;
      default:
        currentCategory = '';
    }

    return currentCategory && currentCategory.scrollIntoView();
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
        <IngredientsCategory title="Булки" cards={bun || []} ref={bunRef} />
        <IngredientsCategory title="Соусы" cards={sauce || []} ref={sauceRef} />
        <IngredientsCategory title="Начинки" cards={main || []} ref={mainRef} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
