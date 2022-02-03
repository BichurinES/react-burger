import React, { FC } from 'react';
import styles from './info-tooltip.module.css';

const InfoTooltip: FC<{ message: string }> = ({ message, children }) => (
  <>
    {children}
    <h3 className={`${styles.title} text text_type_main-medium mt-10 mb-25`}>{message}</h3>
  </>
);

export default InfoTooltip;
