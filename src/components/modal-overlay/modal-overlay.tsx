/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, MouseEvent } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlay = {
  isLockApp?: boolean;
  handleClosePopup?: () => void;
};

const ModalOverlay: FC<TModalOverlay> = ({ children, isLockApp, handleClosePopup }) => {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget && !isLockApp && handleClosePopup) {
      handleClosePopup();
    }
  };

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayClick}>
      {children}
    </div>
  );
};

ModalOverlay.defaultProps = {
  isLockApp: false,
  handleClosePopup: () => {},
};

export default ModalOverlay;
