import React, { useState } from 'react';
import Main from '../components/main/main';
import CredentialsForm from '../components/credentials-form/credentials-form';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit() {
    JSON.stringify({ name, email, password });
  }

  const formConfig = {
    title: 'Регистрация',
    inputs: [
      {
        type: 'text',
        placeholder: 'Имя',
        value: name,
        name: 'name',
        size: 'default',
        onChange: (e) => setName(e.target.value),
      },
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
    buttonText: 'Зарегистрироваться',
    navs: [
      { captionText: 'Уже зарегистрированы?', linkTo: '/login', linkText: 'Войти' },
    ],
    onSubmit,
  };

  return (
    <Main>
      <CredentialsForm {...formConfig} />
    </Main>
  );
}

export default Register;
