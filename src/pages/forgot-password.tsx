import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CredentialsForm from '../components/credentials-form/credentials-form';
import { sendResetEmail } from '../services/actions/forgot-password';
import { useSelector, useDispatch } from '../services/hooks';
import { TCredentialsForm, TSubmitEvent, TInputCnangeEvent } from '../services/types';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { forgotPasswordRequest } = useSelector((state) => state.forgotPassword);
  const history = useHistory();
  const [email, setEmail] = useState('');

  function onSubmit(evt: TSubmitEvent) {
    evt.preventDefault();
    dispatch(sendResetEmail(
      { email },
      () => history.push({ pathname: '/reset-password', state: { from: history.location } }),
    ));
  }

  const formConfig: TCredentialsForm = {
    title: 'Восстановление пароля',
    inputs: [
      {
        type: 'email',
        placeholder: 'Укажите e-mail',
        value: email,
        name: 'email',
        size: 'default',
        onChange: (e: TInputCnangeEvent) => setEmail(e.target.value),
      },
    ],
    buttonText: 'Восстановить',
    navs: [
      { captionText: 'Вспомнили пароль?', linkTo: '/login', linkText: 'Войти' },
    ],
    onSubmit,
    isLoading: forgotPasswordRequest,
  };

  return (
    <CredentialsForm {...formConfig} />
  );
};

export default ForgotPassword;
