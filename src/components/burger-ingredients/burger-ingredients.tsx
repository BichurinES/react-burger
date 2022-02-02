import React, {
  useState, useRef, useEffect, useMemo,
} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useSelector } from '../../services/hooks';
import { TIngredient } from '../../services/types/data';

const BurgerIngredients = () => {
  const { ingredients } = useSelector((state) => state.ingredients);

  function filterIngredients(data: ReadonlyArray<TIngredient>) {
    const res: { [name: string]: TIngredient[] } = {};
    data.forEach((item) => {
      if (res[item.type]) {
        res[item.type].push(item);
      } else {
        res[item.type] = [item];
      }
    });
    return res;
  }

  const { bun, sauce, main } = useMemo(
    () => filterIngredients(ingredients),
    [ingredients],
  );
  const [current, setCurrent] = useState('bun');

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    window.requestAnimationFrame(() => {
      const boundingRectY = [
        {
          type: 'bun',
          top: bunRef.current?.getBoundingClientRect().top,
        },
        {
          type: 'sauce',
          top: sauceRef.current?.getBoundingClientRect().top,
        },
        {
          type: 'main',
          top: mainRef.current?.getBoundingClientRect().top,
        },
      ];

      const closestCategory = boundingRectY.find((category, index, array) => (
        Number(category.top) >= 0 || index === array.length - 1
      ));
      if (closestCategory) setCurrent(closestCategory.type);
    });
  };

  useEffect(() => {
    contentRef.current?.addEventListener('scroll', handleScroll);
    return () => contentRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (value: string) => {
    let currentCategory = null;
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
        currentCategory = null;
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
      <div className={styles.content} ref={contentRef}>
        <IngredientsCategory title="Булки" cards={bun || []} ref={bunRef} />
        <IngredientsCategory title="Соусы" cards={sauce || []} ref={sauceRef} />
        <IngredientsCategory title="Начинки" cards={main || []} ref={mainRef} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
