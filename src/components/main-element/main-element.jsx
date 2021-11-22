import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './main-element.module.css';

function MainElement({ name, price, image }) {
  return (
    <li className={`${styles["list-item"]} pl-8`}>
      <span className={`${styles.icon} mr-2`}><DragIcon type="primary" /></span>
      <ConstructorElement 
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image}
      />
    </li>
  );
}

MainElement.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
}

export default MainElement;
