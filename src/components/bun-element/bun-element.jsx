import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

function BunElement({ className, pos, name, price, image }) {
  return (
    <li className={className}>
      <ConstructorElement
        type={pos}
        isLocked={true}
        text={name + (pos === 'top' ? ' (верх)' : ' (низ)')}
        price={price}
        thumbnail={image}
      />
    </li>
  );
}

BunElement.propTypes = {
  className: PropTypes.string,
  pos: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
}

export default BunElement;
