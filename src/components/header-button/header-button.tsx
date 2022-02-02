import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header-button.module.css';

type THeaderButton = {
  path: string;
  text: string;
};

const HeaderButton: FC<THeaderButton> = ({ children, path, text }) => (
  <NavLink exact to={path} className={`${styles.button} text text_type_main-default text_color_inactive pl-5 pr-5 pb-4 pt-4`} activeClassName={styles.link_active}>
    {children}
    <span className="ml-2">{text}</span>
  </NavLink>
);

export default HeaderButton;
