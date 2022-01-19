import React from 'react';
import { useSelector } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './error-popup.module.css';
import { DEFAULT_ERR_MSG } from '../../utils/constants';
import InfoTooltip from '../info-tooltip/info-tooltip';

function ErrorPopup() {
  const { message } = useSelector((state) => state.popups.errorPopupContent);

  return (
    <InfoTooltip message={message || DEFAULT_ERR_MSG}>
      <div className={styles.error}>
        <CloseIcon type="error" />
      </div>
    </InfoTooltip>
  );
}

export default ErrorPopup;
