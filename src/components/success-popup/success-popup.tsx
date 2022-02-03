import React from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './success-popup.module.css';
import { DEFAULT_SUCCESS_MSG } from '../../utils/constants';
import InfoTooltip from '../info-tooltip/info-tooltip';
import { useSelector } from '../../services/hooks';

const SuccessPopup = () => {
  const successPopupContent = useSelector((state) => state.popups.successPopupContent);

  return (
    <InfoTooltip message={successPopupContent ? successPopupContent.message : DEFAULT_SUCCESS_MSG}>
      <div className={styles.success}>
        <CheckMarkIcon type="success" />
      </div>
    </InfoTooltip>
  );
};

export default SuccessPopup;
