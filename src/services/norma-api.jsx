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

function createRequest(url, { method, body, token }) {
  const headers = {
    'Content-Type': 'application/json',
  };
  let isRequestFailed = false;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const defaultReqSettings = {
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

export function sendOrderRequest(ingredientsId) {
  return createRequest(`${NORMA_API_URL}${ORDERS_URL}`, { method: 'POST', body: ingredientsId });
}

export function forgotPasswordRequest(form) {
  return createRequest(`${NORMA_API_URL}${FORGOT_PASSWORD_URL}`, { method: 'POST', body: form });
}

export function resetPasswordRequest(form) {
  return createRequest(`${NORMA_API_URL}${PASSWORD_RESET_URL}`, { method: 'POST', body: form });
}

export function registerRequest(form) {
  return createRequest(`${NORMA_API_URL}${REGISTER_URL}`, { method: 'POST', body: form });
}

export function loginRequest(form) {
  return createRequest(`${NORMA_API_URL}${LOGIN_URL}`, { method: 'POST', body: form });
}

export function logoutRequest(refreshToken) {
  return createRequest(`${NORMA_API_URL}${LOGOUT_URL}`, { method: 'POST', body: refreshToken });
}

export function refreshTokenRequest(refreshToken) {
  return createRequest(`${NORMA_API_URL}${REFRESH_TOKEN_URL}`, { method: 'POST', body: refreshToken });
}

export function getUserRequest(token) {
  return createRequest(`${NORMA_API_URL}${USER_URL}`, { method: 'GET', token });
}

export function editUserRequest(form, token) {
  return createRequest(`${NORMA_API_URL}${USER_URL}`, { method: 'PATCH', body: form, token });
}
