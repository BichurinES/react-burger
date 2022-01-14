import React, { useState } from 'react';
import Main from '../components/main/main';
import CredentialsForm from '../components/credentials-form/credentials-form';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  function onSubmit() {
    JSON.stringify({ email });
  }

  const formConfig = {
    title: 'Восстановление пароля',
    inputs: [
      {
        type: 'email',
        placeholder: 'Укажите e-mail',
        value: email,
        name: 'email',
        size: 'default',
        onChange: (e) => setEmail(e.target.value),
      },
    ],
    buttonText: 'Восстановить',
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

export default ForgotPassword;
