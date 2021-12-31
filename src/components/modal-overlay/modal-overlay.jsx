/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ children, isLockApp, handleClosePopup }) {
  const handleOverlayClick = (e) => e.target === e.currentTarget && !isLockApp
    && handleClosePopup();

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayClick}>
      {children}
    </div>
  );
}

ModalOverlay.defaultProps = {
  isLockApp: false,
};

ModalOverlay.propTypes = {
  isLockApp: PropTypes.bool,
  children: PropTypes.node.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
};

export default ModalOverlay;
