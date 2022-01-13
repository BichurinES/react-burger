import React from 'react';
import { useSelector } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './error-popup.module.css';
import { DEFAULT_ERR_MSG } from '../../utils/constants';

function ErrorPopup() {
  const { message } = useSelector((state) => state.popups.errorPopupContent);

  return (
    <>
      <div className={styles.error}>
        <CloseIcon type="error" />
      </div>
      <h3 className={`${styles.title} text text_type_main-medium mt-10 mb-25`}>{message || { DEFAULT_ERR_MSG }}</h3>
    </>
  );
}

export default ErrorPopup;
