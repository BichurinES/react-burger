import React from 'react';
import {
  Logo, ProfileIcon, BurgerIcon, ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from '../header-button/header-button';
import styles from './app-header.module.css';
import {
  MAIN_PATH,
  FEED_PATH,
  PROFILE_PATH,
  HEADER_CONSTRUCTOR_BUTTON_TEXT,
  HEADER_ORDERS_BUTTON_TEXT,
  HEADER_PROFILE_BUTTON_TEXT,
} from '../../utils/constants';
import { useLocation } from '../../services/hooks';

const AppHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.menu}>
            <li className="mr-2">
              <HeaderButton path={MAIN_PATH} text={HEADER_CONSTRUCTOR_BUTTON_TEXT}><BurgerIcon type={pathname === MAIN_PATH ? 'primary' : 'secondary'} /></HeaderButton>
            </li>
            <li>
              <HeaderButton path={FEED_PATH} text={HEADER_ORDERS_BUTTON_TEXT}><ListIcon type={pathname === FEED_PATH ? 'primary' : 'secondary'} /></HeaderButton>
            </li>
          </ul>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>

        <HeaderButton path={PROFILE_PATH} text={HEADER_PROFILE_BUTTON_TEXT}><ProfileIcon type={pathname === PROFILE_PATH ? 'primary' : 'secondary'} /></HeaderButton>
      </div>
    </header>
  );
};

export default AppHeader;
