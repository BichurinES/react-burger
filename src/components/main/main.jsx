import React from 'react';
import PropTypes from 'prop-types';
import styles from './main.module.css';
import Loader from '../loader/loader';

function Main({ children, isLoading }) {
  return (
    <main className={`${styles.main} ${isLoading && styles.main_loader}`}>
      {isLoading ? <Loader /> : children}
    </main>
  );
}

Main.defaultProps = {
  isLoading: false,
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
};

export default Main;
