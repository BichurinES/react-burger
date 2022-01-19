import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import CredentialsForm from '../components/credentials-form/credentials-form';
import { signIn } from '../services/actions/login';

function Login() {
  const dispatch = useDispatch();
  const { loginRequest } = useSelector((state) => state.login);
  const history = useHistory();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(evt) {
    evt.preventDefault();
    dispatch(signIn({ email, password }))
      .then((res) => {
        if (res) {
          history.replace(state?.from || '/');
        }
      });
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
    <CredentialsForm {...formConfig} isLoading={loginRequest} />
  );
}

export default Login;
