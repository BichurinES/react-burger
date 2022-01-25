import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import CredentialsForm from '../components/credentials-form/credentials-form';
import { signUp } from '../services/actions/register';

function Register() {
  const dispatch = useDispatch();
  const { registerRequest } = useSelector((state) => state.register);
  const history = useHistory();
  const { state } = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(evt) {
    evt.preventDefault();
    dispatch(signUp({ name, email, password }))
      .then((res) => {
        if (res) {
          history.replace(state?.from || '/');
        }
      });
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
    <CredentialsForm {...formConfig} isLoading={registerRequest} />
  );
}

export default Register;
