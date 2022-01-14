import React, { useState } from 'react';
import Main from '../components/main/main';
import CredentialsForm from '../components/credentials-form/credentials-form';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit() {
    JSON.stringify({ email, password });
  }

  const formConfig = {
    title: 'Восстановление пароля',
    inputs: [
      {
        type: 'password',
        placeholder: 'Введите новый пароль',
        value: password,
        name: 'password',
        size: 'default',
        onChange: (e) => setPassword(e.target.value),
      },
      {
        type: 'text',
        placeholder: 'Введите код из письма',
        value: email,
        name: 'email',
        size: 'default',
        onChange: (e) => setEmail(e.target.value),
      },
    ],
    buttonText: 'Сохранить',
    navs: [
      { captionText: 'Вспомнили пароль?', linkTo: '/login', linkText: 'Войти' },
    ],
    onSubmit,
  };

  return (
    <Main>
      <CredentialsForm {...formConfig} />
    </Main>
  );
}

export default ResetPassword;
