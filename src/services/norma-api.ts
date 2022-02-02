import {
  NORMA_API_URL,
  INGREDIENTS_URL,
  ORDERS_URL,
  FORGOT_PASSWORD_URL,
  PASSWORD_RESET_URL,
  REGISTER_URL,
  LOGIN_URL,
  LOGOUT_URL,
  REFRESH_TOKEN_URL,
  USER_URL,
} from '../utils/constants';
import {
  TRegisterForm,
  TLoginForm,
  TForgotPasswordForm,
  TResetPasswordForm,
  TProfileForm,
  TToken,
  TRefreshToken,
  TIngredientsId,
} from './types';

type TRequestSettings = {
  method: 'GET' | 'POST' | 'PATCH';
  body?: { [name: string]: string | number }
  | { [name: string]: ReadonlyArray<string> };
  token?: string;
};

function createRequest(url: string, { method, body, token }: TRequestSettings): Promise<any> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ',
  };
  let isRequestFailed = false;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const defaultReqSettings: RequestInit = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  return fetch(url, {
    method,
    body: JSON.stringify(body),
    headers,
    ...defaultReqSettings,
  })
    .then((res) => {
      if (!res.ok) {
        isRequestFailed = true;
      }
      return res.json();
    })
    .then((res) => {
      if (isRequestFailed) {
        throw new Error(res.message);
      }
      return res;
    });
}

export function getIngredientsRequest() {
  return createRequest(`${NORMA_API_URL}${INGREDIENTS_URL}`, { method: 'GET' });
}

export function sendOrderRequest(ingredientsId: TIngredientsId) {
  return createRequest(`${NORMA_API_URL}${ORDERS_URL}`, { method: 'POST', body: ingredientsId });
}

export function forgotPasswordRequest(form: TForgotPasswordForm) {
  return createRequest(`${NORMA_API_URL}${FORGOT_PASSWORD_URL}`, { method: 'POST', body: form });
}

export function resetPasswordRequest(form: TResetPasswordForm) {
  return createRequest(`${NORMA_API_URL}${PASSWORD_RESET_URL}`, { method: 'POST', body: form });
}

export function registerRequest(form: TRegisterForm) {
  return createRequest(`${NORMA_API_URL}${REGISTER_URL}`, { method: 'POST', body: form });
}

export function loginRequest(form: TLoginForm) {
  return createRequest(`${NORMA_API_URL}${LOGIN_URL}`, { method: 'POST', body: form });
}

export function logoutRequest(refreshToken: TRefreshToken) {
  return createRequest(`${NORMA_API_URL}${LOGOUT_URL}`, { method: 'POST', body: refreshToken });
}

export function refreshTokenRequest(refreshToken: TRefreshToken) {
  return createRequest(`${NORMA_API_URL}${REFRESH_TOKEN_URL}`, { method: 'POST', body: refreshToken });
}

export function getUserRequest(token: TToken) {
  return createRequest(`${NORMA_API_URL}${USER_URL}`, { method: 'GET', token });
}

export function editUserRequest(form: TProfileForm, token: TToken) {
  return createRequest(`${NORMA_API_URL}${USER_URL}`, { method: 'PATCH', body: form, token });
}
