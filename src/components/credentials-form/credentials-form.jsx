import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './credentials-form.module.css';
import PasswordPlaceholderInput from '../password-placeholder-input/password-placeholder-input';

function CredentialsForm({
  title, inputs, buttonText, navs, onSubmit,
}) {
  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-medium`}>{title}</h1>
      <form className={`${styles.form} mt-6 mb-20`} onSubmit={onSubmit}>
        {inputs.map(({
          type, placeholder, value, name, icon, size, onChange, onIconClick, ref,
        }) => (name === 'password'
          ? (
            <PasswordPlaceholderInput
              key={name}
              type={type}
              placeholder={placeholder}
              value={value}
              name={name}
              size={size}
              onChange={onChange}
            />
          )
          : (
            <Input
              key={name}
              type={type}
              placeholder={placeholder}
              value={value}
              name={name}
              icon={icon}
              size={size}
              onChange={onChange}
              onIconClick={onIconClick}
              ref={ref}
            />
          )))}
        <Button type="primary" size="medium">{buttonText}</Button>
      </form>
      {navs.map(({ captionText, linkTo, linkText }) => (
        <p key={linkText} className={`${styles.nav} text text_type_main-default text_color_inactive`}>
          <span>{captionText}</span>
          <Link className={`${styles.link} ml-2`} to={linkTo}>{linkText}</Link>
        </p>
      ))}
    </section>
  );
}

CredentialsForm.defaultProps = {
  navs: [],
};

CredentialsForm.propTypes = {
  title: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    size: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onIconClick: PropTypes.func,
  })).isRequired,
  buttonText: PropTypes.string.isRequired,
  navs: PropTypes.arrayOf(PropTypes.shape({
    captionText: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
  })),
  onSubmit: PropTypes.func.isRequired,
};

export default CredentialsForm;
