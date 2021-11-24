import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import filteredIngredientsType from '../../types/filtered-ingredients-type';
import IngredientsCategory from '../ingredients-category/ingredients-category';

function BurgerIngredients({ filteredIngredients }) {
  const { bun, sauce, main } = filteredIngredients;
  const [current, setCurrent] = React.useState('bun');

  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);

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

BurgerIngredients.propTypes = {
  filteredIngredients: filteredIngredientsType.isRequired,
};

export default BurgerIngredients;
