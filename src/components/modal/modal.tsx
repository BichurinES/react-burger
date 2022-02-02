import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

type TModal = {
  title?: string;
  handleClosePopup: () => void;
};

const Modal: FC<TModal> = ({ children, title, handleClosePopup }) => {
  useEffect(() => {
    const closeByEscape: (e: any) => void = (e) => {
      if (e.key === 'Escape') {
        handleClosePopup();
      }
    };
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
    document.getElementById('react-modals')!,
  );
};

export default Modal;
