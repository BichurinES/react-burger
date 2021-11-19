import PropTypes from 'prop-types';
import ingredientType from './ingredient-type';

export default PropTypes.objectOf(PropTypes.arrayOf(ingredientType).isRequired);
