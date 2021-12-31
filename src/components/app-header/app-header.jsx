import React from 'react';
import {
  Logo, ProfileIcon, BurgerIcon, ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from '../header-button/header-button';
import styles from './app-header.module.css';
import {
  HEADER_CONSTRUCTOR_BUTTON_TEXT,
  HEADER_ORDERS_BUTTON_TEXT,
  HEADER_PROFILE_BUTTON_TEXT,
} from '../../utils/constants';

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.menu}>
            <li className="mr-2">
              <HeaderButton inactive={false} text={HEADER_CONSTRUCTOR_BUTTON_TEXT}><BurgerIcon type="primary" /></HeaderButton>
            </li>
            <li>
              <HeaderButton inactive text={HEADER_ORDERS_BUTTON_TEXT}><ListIcon type="secondary" /></HeaderButton>
            </li>
          </ul>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>

        <HeaderButton inactive text={HEADER_PROFILE_BUTTON_TEXT}><ProfileIcon type="secondary" /></HeaderButton>
      </div>
    </header>
  );
}

export default AppHeader;
