import React from 'react';
import PropTypes from 'prop-types';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal-overlay.module.css';

function ModalOverlay({ children, closeAllPopups }) {
  const handleOverlayClick = (e) => {
    e.target === e.currentTarget && closeAllPopups();
  }

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayClick}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  closeAllPopups: PropTypes.func.isRequired,
}

export default ModalOverlay;
