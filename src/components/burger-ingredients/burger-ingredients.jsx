import React from 'react';
import styles from './burger-ingredients.module.css';
import filteredIngredientsType from '../../types/filtered-ingredients-type';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { filtrationKeys } from '../../utils/constants';

function BurgerIngredients({ filteredIngredients }) {
  const [current, setCurrent] = React.useState(filtrationKeys[0]);
  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const handleTabClick = (value) => {
    let currentCategory = '';
    setCurrent(value);

    switch(value) {
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

    currentCategory && currentCategory.scrollIntoView();
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
        <IngredientsCategory title="Булки" cards={filteredIngredients[filtrationKeys[0]] || []} ref={bunRef} />
        <IngredientsCategory title="Соусы" cards={filteredIngredients[filtrationKeys[1]] || []} ref={sauceRef} />
        <IngredientsCategory title="Начинки" cards={filteredIngredients[filtrationKeys[2]] || []} ref={mainRef} />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  filteredIngredients: filteredIngredientsType.isRequired,
}

export default BurgerIngredients;
