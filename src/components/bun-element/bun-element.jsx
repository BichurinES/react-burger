import React from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../types/ingredient-type';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

class BunElement extends React.Component {
  render() {
    return (
      <li className={this.props.className}>
        <ConstructorElement
          type={this.props.pos}
          isLocked={true}
          text={this.props.card.name + (this.props.pos === 'top' ? ' (верх)' : ' (низ)')}
          price={this.props.card.price}
          thumbnail={this.props.card["image_mobile"]}
        />
      </li>
    );
  }
}

BunElement.propTypes = {
  className: PropTypes.string,
  pos: PropTypes.string.isRequired,
  card: ingredientType.isRequired,
}

export default BunElement;
