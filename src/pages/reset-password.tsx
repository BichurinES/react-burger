import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import CredentialsForm from '../components/credentials-form/credentials-form';
import { resetPassword } from '../services/actions/reset-password';
import { useSelector, useDispatch, useLocation } from '../services/hooks';
import { TCredentialsForm, TSubmitEvent, TInputCnangeEvent } from '../services/types';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { resetPasswordRequest } = useSelector((state) => state.resetPassword);
  const history = useHistory();
  const location = useLocation();
  const passwordResetAccess = location.state?.from?.pathname === '/forgot-password';

  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e: TSubmitEvent) {
    e.preventDefault();
    dispatch(resetPassword({ token, password }, () => history.replace('/login')));
  }

  const formConfig: TCredentialsForm = {
    title: 'Восстановление пароля',
    inputs: [
      {
        type: 'password',
        placeholder: 'Введите новый пароль',
        value: password,
        name: 'password',
        size: 'default',
        onChange: (e: TInputCnangeEvent) => setPassword(e.target.value),
      },
      {
        type: 'text',
        placeholder: 'Введите код из письма',
        value: token,
        name: 'token',
        size: 'default',
        onChange: (e: TInputCnangeEvent) => setToken(e.target.value),
      },
    ],
    buttonText: 'Сохранить',
    navs: [
      { captionText: 'Вспомнили пароль?', linkTo: '/login', linkText: 'Войти' },
    ],
    onSubmit,
    isLoading: resetPasswordRequest,
  };

  return passwordResetAccess
    ? (<CredentialsForm {...formConfig} />)
    : (<Redirect to="/forgot-password" />);
};

export default ResetPassword;
