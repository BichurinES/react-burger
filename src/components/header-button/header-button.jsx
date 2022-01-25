import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './header-button.module.css';

function HeaderButton({ children, path, text }) {
  return (
    <NavLink exact to={path} className={`${styles.button} text text_type_main-default text_color_inactive pl-5 pr-5 pb-4 pt-4`} activeClassName={styles.link_active}>
      {children}
      <span className="ml-2">{text}</span>
    </NavLink>
  );
}

HeaderButton.defaultProps = {
  children: null,
};

HeaderButton.propTypes = {
  children: PropTypes.element,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default HeaderButton;
