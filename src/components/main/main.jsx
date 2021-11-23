import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import filteredIngredientsType from '../../types/filtered-ingredients-type';

function Main(props) {
  return (
    <main className={`${styles.main}`}>
      <BurgerIngredients {...props} />
      <BurgerConstructor />
    </main>
  );
}

Main.propTypes = {
  filteredIngredients: filteredIngredientsType.isRequired,
}

export default Main;
