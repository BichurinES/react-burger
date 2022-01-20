import React, { useState } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CredentialsForm from '../components/credentials-form/credentials-form';
import { resetPassword } from '../services/actions/reset-password';

function ResetPassword() {
  const dispatch = useDispatch();
  const { resetPasswordRequest } = useSelector((state) => state.resetPassword);
  const history = useHistory();
  const location = useLocation();
  const passwordResetAccess = location.state?.from?.pathname === '/forgot-password';

  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(evt) {
    evt.preventDefault();
    dispatch(resetPassword({ token, password }))
      .then((res) => {
        if (res) {
          history.replace('/login');
        }
      });
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
        value: token,
        name: 'token',
        size: 'default',
        onChange: (e) => setToken(e.target.value),
      },
    ],
    buttonText: 'Сохранить',
    navs: [
      { captionText: 'Вспомнили пароль?', linkTo: '/login', linkText: 'Войти' },
    ],
    onSubmit,
  };

  return passwordResetAccess
    ? (<CredentialsForm {...formConfig} isLoading={resetPasswordRequest} />)
    : (<Redirect to="/forgot-password" />);
}

export default ResetPassword;
