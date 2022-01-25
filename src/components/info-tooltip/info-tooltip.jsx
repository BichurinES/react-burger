import React from 'react';
import PropTypes from 'prop-types';
import styles from './info-tooltip.module.css';

function InfoTooltip({ message, children }) {
  return (
    <>
      {children}
      <h3 className={`${styles.title} text text_type_main-medium mt-10 mb-25`}>{message}</h3>
    </>
  );
}

InfoTooltip.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default InfoTooltip;
