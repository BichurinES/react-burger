import {
  NORMA_API_URL, INGREDIENTS_URL, ORDERS_URL, DEFAULT_REQUEST_ERR_MSG,
} from './constants';

function createRequest(url, reqObj) {
  const headers = {
    'Content-Type': 'application/json',
  };

  return fetch(
    NORMA_API_URL + url,
    { method: reqObj.method, body: JSON.stringify(reqObj.body), headers },
  )
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error(res.message);
    })
    .then((data) => {
      if (data.success) {
        return data;
      }
      throw new Error(DEFAULT_REQUEST_ERR_MSG);
    });
}

export function getData() {
  return createRequest(INGREDIENTS_URL, { method: 'GET' });
}

export function sendOrder(ingredientsId) {
  return createRequest(ORDERS_URL, { method: 'POST', body: ingredientsId });
}
