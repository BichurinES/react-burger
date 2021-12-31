import {
  NORMA_API_URL, INGREDIENTS_URL, ORDERS_URL, DEFAULT_REQUEST_ERR_MSG,
} from '../utils/constants';

function createRequest(url, reqObj) {
  const headers = {
    'Content-Type': 'application/json',
  };

  return fetch(
    url,
    { method: reqObj.method, body: JSON.stringify(reqObj.body), headers },
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.message || DEFAULT_REQUEST_ERR_MSG);
    });
}

export function getIngredientsRequest() {
  return createRequest(NORMA_API_URL + INGREDIENTS_URL, { method: 'GET' });
}

export function sendOrder(ingredientsId) {
  return createRequest(NORMA_API_URL + ORDERS_URL, { method: 'POST', body: ingredientsId });
}
