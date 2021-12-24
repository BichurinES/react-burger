import React from 'react';
import { useSelector } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './error-popup.module.css';
import Modal from '../modal/modal';

function ErrorPopup() {
  const { message } = useSelector((state) => state.popups.errorPopupContent);

  return (
    <Modal>
      <div className={styles.error}>
        <CloseIcon type="error" />
      </div>
      <h3 className={`${styles.title} text text_type_main-large mt-10 mb-25`}>{message || 'Ошибка сервера'}</h3>
    </Modal>
  );
}

export default ErrorPopup;
