import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CLOSE_ALL_POPUPS } from '../../services/actions/popups';

const modalRoot = document.getElementById('react-modals');

function Modal({ children, title }) {
  const dispatch = useDispatch();

  const closeAllPopups = () => dispatch({ type: CLOSE_ALL_POPUPS });
  const handleEscPress = (e) => e.key === 'Escape' && closeAllPopups();

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  });

  return ReactDOM.createPortal(
    <ModalOverlay>
      <div className={`${styles.modal} pl-10 pt-10 pr-10`}>
        <header className={`${styles.header}`}>
          <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>
          <CloseIcon type="primary" onClick={closeAllPopups} />
        </header>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Modal;
