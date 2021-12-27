/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
import { CLOSE_ALL_POPUPS } from '../../services/actions/popups';

function ModalOverlay({ children, isLockApp }) {
  const dispatch = useDispatch();

  const handleOverlayClick = (e) => e.target === e.currentTarget && !isLockApp
    && dispatch({ type: CLOSE_ALL_POPUPS });

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
};

export default ModalOverlay;
