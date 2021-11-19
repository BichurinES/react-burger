import PropTypes from 'prop-types';
import ingredientType from '../../types/ingredient-type';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

function BunElement({ className, pos, card }) {
  return (
    <li className={className}>
      <ConstructorElement
        type={pos}
        isLocked={true}
        text={card.name + (pos === 'top' ? ' (верх)' : ' (низ)')}
        price={card.price}
        thumbnail={card["image_mobile"]}
      />
    </li>
  );
}

BunElement.propTypes = {
  className: PropTypes.string,
  pos: PropTypes.string.isRequired,
  card: ingredientType.isRequired,
}

export default BunElement;
