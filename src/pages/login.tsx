import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, useLocation } from '../services/hooks';
import CredentialsForm from '../components/credentials-form/credentials-form';
import { signIn } from '../services/actions/login';
import { TCredentialsForm, TSubmitEvent, TInputCnangeEvent } from '../services/types';
import { FORGOT_PASSWORD_PATH, MAIN_PATH, REGISTER_PATH } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const { loginRequest } = useSelector((state) => state.login);
  const history = useHistory();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e: TSubmitEvent) {
    e.preventDefault();
    dispatch(signIn({ email, password }, () => history.replace(state?.from || MAIN_PATH)));
  }

  const formConfig: TCredentialsForm = {
    title: 'Вход',
    inputs: [
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
    buttonText: 'Войти',
    navs: [
      { captionText: 'Вы — новый пользователь?', linkTo: REGISTER_PATH, linkText: 'Зарегистрироваться' },
      { captionText: 'Забыли пароль?', linkTo: FORGOT_PASSWORD_PATH, linkText: 'Восстановить пароль' },
    ],
    onSubmit,
    isLoading: loginRequest,
  };

  return (
    <CredentialsForm {...formConfig} />
  );
};

export default Login;
