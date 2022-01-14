import React from 'react';
import { useSelector } from 'react-redux';
import Main from '../components/main/main';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

function Home() {
  const { ingredientsRequest } = useSelector((store) => store.ingredients);

  return (
    <Main isLoading={ingredientsRequest}>
      <BurgerIngredients />
      <BurgerConstructor />
    </Main>
  );
}

export default Home;
