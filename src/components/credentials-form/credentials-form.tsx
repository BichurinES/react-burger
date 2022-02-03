import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './credentials-form.module.css';
import PasswordPlaceholderInput from '../password-placeholder-input/password-placeholder-input';
import ModalLoader from '../modal-loader/modal-loader';
import { TCredentialsForm } from '../../services/types';

const CredentialsForm: FC<TCredentialsForm> = ({
  title, inputs, buttonText, navs, onSubmit, isLoading,
}) => (
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
    {isLoading && <ModalLoader />}
  </section>
);

export default CredentialsForm;
