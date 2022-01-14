import React, { useState } from 'react';
import Main from '../components/main/main';
import CredentialsForm from '../components/credentials-form/credentials-form';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit() {
    JSON.stringify({ email, password });
  }

  const formConfig = {
    title: 'Вход',
    inputs: [
      {
        type: 'email',
        placeholder: 'Email',
        value: email,
        name: 'email',
        size: 'default',
        onChange: (e) => setEmail(e.target.value),
      },
      {
        type: 'password',
        placeholder: 'Пароль',
        value: password,
        name: 'password',
        size: 'default',
        onChange: (e) => setPassword(e.target.value),
      },
    ],
    buttonText: 'Войти',
    navs: [
      { captionText: 'Вы — новый пользователь?', linkTo: '/register', linkText: 'Зарегистрироваться' },
      { captionText: 'Забыли пароль?', linkTo: '/forgot-password', linkText: 'Восстановить пароль' },
    ],
    onSubmit,
  };

  return (
    <Main>
      <CredentialsForm {...formConfig} />
    </Main>
  );
}

export default Login;
