import React from 'react';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal-overlay.module.css';

function ModalOverlay({ children, closeAllPopups }) {
  const handleEscPress = (e) => {
    e.key === 'Escape' && closeAllPopups();
  }

  const handleOverlayClick = (e) => {
    e.target === e.currentTarget && closeAllPopups();
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress)
    }
  });

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayClick}>
      {children}
    </div>
  );
}

export default ModalOverlay;
