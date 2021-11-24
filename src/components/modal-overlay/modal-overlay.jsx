/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
import { PopupControlContext } from '../../contexts/appContext';

function ModalOverlay({ children }) {
  const { closeAllPopups } = useContext(PopupControlContext);

  const handleOverlayClick = (e) => e.target === e.currentTarget && closeAllPopups();

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayClick}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalOverlay;
