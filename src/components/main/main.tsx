import React, { FC } from 'react';
import styles from './main.module.css';
import Loader from '../loader/loader';

const Main: FC<{ isLoading: boolean }> = ({ children, isLoading }) => (
  <main className={`${styles.main} ${isLoading && styles.main_loader} pl-5 pr-5`}>
    {isLoading ? <Loader /> : children}
  </main>
);

export default Main;
