import PropTypes from 'prop-types';
import ingredientType from './ingredient-type';

export default PropTypes.arrayOf(ingredientType.isRequired);
