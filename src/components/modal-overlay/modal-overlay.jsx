/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
import { CLOSE_ALL_POPUPS } from '../../services/actions/popups';

function ModalOverlay({ children }) {
  const dispatch = useDispatch();

  const handleOverlayClick = (e) => e.target === e.currentTarget
    && dispatch({ type: CLOSE_ALL_POPUPS });

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
