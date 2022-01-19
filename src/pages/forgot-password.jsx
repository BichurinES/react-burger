import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CredentialsForm from '../components/credentials-form/credentials-form';
import { sendResetEmail } from '../services/actions/forgot-password';

function ForgotPassword() {
  const dispatch = useDispatch();
  const { forgotPasswordRequest } = useSelector((state) => state.forgotPassword);
  const history = useHistory();
  const [email, setEmail] = useState('');

  function onSubmit(evt) {
    evt.preventDefault();
    dispatch(sendResetEmail({ email }))
      .then((res) => {
        if (res) {
          history.push('/reset-password');
        }
      });
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
    <CredentialsForm {...formConfig} isLoading={forgotPasswordRequest} />
  );
}

export default ForgotPassword;
