import ingredientType from '../../types/ingredient-type';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './main-element.module.css';

function MainElement({ card }) {
  return (
    <li className={`${styles["list-item"]} pl-8`}>
      <span className={`${styles.icon} mr-2`}><DragIcon type="primary" /></span>
      <ConstructorElement 
        isLocked={false}
        text={card.name}
        price={card.price}
        thumbnail={card["image_mobile"]}
      />
    </li>
  );
}

MainElement.propTypes = {
  card: ingredientType.isRequired,
}

export default MainElement;
