import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals');

function Modal({ children, title, handleClosePopup }) {
  useEffect(() => {
    const closeByEscape = (e) => (e.key === 'Escape') && handleClosePopup();
    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay handleClosePopup={handleClosePopup}>
      <div className={`${styles.modal} pl-10 pt-10 pr-10`}>
        <header className={`${styles.header}`}>
          <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>
          <CloseIcon type="primary" onClick={handleClosePopup} />
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
  handleClosePopup: PropTypes.func.isRequired,
};

export default Modal;
