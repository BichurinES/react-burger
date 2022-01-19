import React from 'react';
import { useSelector } from 'react-redux';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './success-popup.module.css';
import { DEFAULT_SUCCESS_MSG } from '../../utils/constants';
import InfoTooltip from '../info-tooltip/info-tooltip';

function SuccessPopup() {
  const { message } = useSelector((state) => state.popups.successPopupContent);

  return (
    <InfoTooltip message={message || DEFAULT_SUCCESS_MSG}>
      <div className={styles.success}>
        <CheckMarkIcon type="success" />
      </div>
    </InfoTooltip>
  );
}

export default SuccessPopup;
