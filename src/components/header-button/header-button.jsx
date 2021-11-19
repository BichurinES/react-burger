import PropTypes from 'prop-types';
import styles from './header-button.module.css';

function HeaderButton({ children, inactive, text }) {
  return (
    <button className={`${styles.button} pl-5 pr-5 pb-4 pt-4`}>
      {children}
      <span className={`text text_type_main-default ${inactive ? "text_color_inactive" : null} ml-2`}>{text}</span>
    </button>
  );
}

HeaderButton.defaultProps = {
  inactive: false,
}; 

HeaderButton.propTypes = {
  inactive: PropTypes.bool,
  text: PropTypes.string.isRequired,
  children: PropTypes.element,
}

export default HeaderButton;
