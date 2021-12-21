import React from 'react';
import {
  Logo, ProfileIcon, BurgerIcon, ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from '../header-button/header-button';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.menu}>
            <li className="mr-2">
              <HeaderButton inactive={false} text="Конструктор"><BurgerIcon type="primary" /></HeaderButton>
            </li>
            <li>
              <HeaderButton inactive text="Лента заказов"><ListIcon type="secondary" /></HeaderButton>
            </li>
          </ul>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>

        <HeaderButton inactive text="Личный кабинет"><ProfileIcon type="secondary" /></HeaderButton>
      </div>
    </header>
  );
}

export default AppHeader;
