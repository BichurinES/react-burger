import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CredentialsForm from '../components/credentials-form/credentials-form';
import { signUp } from '../services/actions/register';
import { useSelector, useDispatch, useLocation } from '../services/hooks';
import { TCredentialsForm, TSubmitEvent, TInputCnangeEvent } from '../services/types';
import { LOGIN_PATH, MAIN_PATH } from '../utils/constants';

const Register = () => {
  const dispatch = useDispatch();
  const { registerRequest } = useSelector((state) => state.register);
  const history = useHistory();
  const { state } = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e: TSubmitEvent) {
    e.preventDefault();
    dispatch(signUp({ name, email, password }, () => history.replace(state?.from || MAIN_PATH)));
  }

  const formConfig: TCredentialsForm = {
    title: 'Регистрация',
    inputs: [
      {
        type: 'text',
        placeholder: 'Имя',
        value: name,
        name: 'name',
        size: 'default',
        onChange: (e: TInputCnangeEvent) => setName(e.target.value),
      },
      {
        type: 'email',
        placeholder: 'Email',
        value: email,
        name: 'email',
        size: 'default',
        onChange: (e: TInputCnangeEvent) => setEmail(e.target.value),
      },
      {
        type: 'password',
        placeholder: 'Пароль',
        value: password,
        name: 'password',
        size: 'default',
        onChange: (e: TInputCnangeEvent) => setPassword(e.target.value),
      },
    ],
    buttonText: 'Зарегистрироваться',
    navs: [
      { captionText: 'Уже зарегистрированы?', linkTo: LOGIN_PATH, linkText: 'Войти' },
    ],
    onSubmit,
    isLoading: registerRequest,
  };

  return (
    <CredentialsForm {...formConfig} />
  );
};

export default Register;
