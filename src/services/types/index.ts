import { FormEvent, ChangeEvent } from 'react';
import { TInput } from './ui-components';

export type TLocation = {
  pathname: string;
  search: string;
  hash: string;
  key?: string;
  state: TLocation | null;
  background?: TLocation;
  from?: TLocation;
};

export type TToken = string;
export type TRefreshToken = { token: string };
export type TIngredientsId = { ingredients: ReadonlyArray<string> };

export type TCredentialsForm = {
  title: string;
  inputs: Array<TInput>;
  buttonText: string;
  navs: {
    captionText: string;
    linkTo: string;
    linkText: string;
  }[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

export type TRegisterForm = {
  name: string;
  email: string;
  password: string;
};

export type TLoginForm = Pick<TRegisterForm, 'email' | 'password'>;

export type TForgotPasswordForm = Pick<TRegisterForm, 'email'>;

export type TResetPasswordForm = Pick<TRegisterForm, 'password'> & TRefreshToken;

export type TProfileForm = {
  name?: string;
  email?: string;
  password?: string;
};

export type TCallback = () => void;
export type TSubmitEvent = FormEvent<HTMLFormElement>;
export type TInputCnangeEvent = ChangeEvent<HTMLInputElement>;
