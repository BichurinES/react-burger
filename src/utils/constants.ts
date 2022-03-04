import { TIngredient, TMainIngredient, TUpdatedFeed } from '../services/types/data';

// API
export const NORMA_API_URL = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_URL = '/ingredients';
export const ORDERS_URL = '/orders';
export const FEED_URL = '/orders/all';
export const FORGOT_PASSWORD_URL = '/password-reset';
export const PASSWORD_RESET_URL = '/password-reset/reset';
export const REGISTER_URL = '/auth/register';
export const LOGIN_URL = '/auth/login';
export const LOGOUT_URL = '/auth/logout';
export const REFRESH_TOKEN_URL = '/auth/token';
export const USER_URL = '/auth/user';

// WS
export const WS_FEED_URL = 'wss://norma.nomoreparties.space/orders/all';
export const WS_MY_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';
export const MAX_INGREDIETNS_IN_CARD = 6;

// Routing
export const MAIN_PATH = '/react-burger';
export const FEED_PATH = `${MAIN_PATH}/feed`;
export const FEED_ID_PATH = `${MAIN_PATH}/feed/:id`;
export const PROFILE_PATH = `${MAIN_PATH}/profile`;
export const PROFILE_ORDERS_PATH = `${MAIN_PATH}/profile/orders`;
export const PROFILE_ORDERS_ID_PATH = `${MAIN_PATH}/profile/orders/:id`;
export const LOGIN_PATH = `${MAIN_PATH}/login`;
export const REGISTER_PATH = `${MAIN_PATH}/register`;
export const FORGOT_PASSWORD_PATH = `${MAIN_PATH}/forgot-password`;
export const RESET_PASSWORD_PATH = `${MAIN_PATH}/reset-password`;
export const INGREDIENTS_PATH = `${MAIN_PATH}/ingredients`;
export const INGREDIENTS_ID_PATH = `${MAIN_PATH}/ingredients/:id`;

// Error messages
export const DEFAULT_ERR_MSG = 'Ошибка сервера';
export const DEFAULT_SUCCESS_MSG = 'Данные успешно отправлены';
export const DEFAULT_REQUEST_ERR_MSG = 'Ошибка запроса! Данные не получены';
export const BUN_REQUIRED_ERR_MSG = 'Перед добавлением ингредиентов, сначала нужно выбрать булку для будущего бургера';
export const TOKEN_ERR_MSG = 'Ошибка получения токена, неоходимо повторно пройти авторизацию';

// Button text
export const HEADER_CONSTRUCTOR_BUTTON_TEXT = 'Конструктор';
export const HEADER_ORDERS_BUTTON_TEXT = 'Лента заказов';
export const HEADER_PROFILE_BUTTON_TEXT = 'Личный кабинет';
export const CONSTRUCTOR_DEFAULT_TEXT = 'Пожалуйста, выберете булку бургера для создания заказа';
export const CONSTRUCTOR_BUTTON_TEXT = 'Оформить заказ';
export const CONSTRUCTOR_LOADING_BUTTON_TEXT = 'Оформляем...';

// Test data
export const TEST_BUN: TIngredient = {
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

export const TEST_MAIN_INGREDIENT: TIngredient | TMainIngredient = {
  _id: '60d3b41abdacab0026a733ca',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  __v: 0,
};

export const TEST_SAUCE_INGREDIENT: TIngredient | TMainIngredient = {
  _id: '60d3b41abdacab0026a733ce',
  name: 'Соус традиционный галактический',
  type: 'sauce',
  proteins: 42,
  fat: 24,
  carbohydrates: 42,
  calories: 99,
  price: 15,
  image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
  __v: 0,
};

export const TEST_REMOVED_INGREDIENT = {
  _cartId: '3214',
  price: 3000,
};

export const TEST_ORDER_DETAILS = {
  success: true,
  name: 'Флюоресцентный space бургер',
  order: {
    ingredients: [{
      _id: '60d3b41abdacab0026a733c7',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0,
    }, {
      _id: '60d3b41abdacab0026a733cd',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
      __v: 0,
    }],
    _id: '621cb07d25b9a4001b6e19fb',
    owner: {
      name: 'Name',
      email: '123@gmail.com',
      createdAt: '2022-01-19T09:47:16.605Z',
      updatedAt: '2022-02-14T04:25:41.834Z',
    },
    status: 'done',
    name: 'Флюоресцентный space бургер',
    createdAt: '2022-02-28T11:22:37.603Z',
    updatedAt: '2022-02-28T11:22:37.818Z',
    number: 10821,
    price: 1068,
  },
};

export const TEST_ERROR = {
  name: 'error',
  message: 'error',
};

export const TEST_SUCCESS = {
  success: true,
  message: 'success',
};

export const TEST_USER = {
  email: '123@gmail.com',
  name: 'Name',
};

export const TEST_FEED: TUpdatedFeed = {
  orders: [{
    createdAt: '2022-03-01T01:36:54.880Z',
    ingredients: [
      {
        _id: '60d3b41abdacab0026a733c7',
        price: 988,
        name: 'Флюоресцентная булка R2-D3',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        type: 'bun',
      },
      {
        _id: '60d3b41abdacab0026a733c8',
        price: 988,
        name: 'Филе Люминесцентного тетраодонтимформа',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        type: 'main',
      },
    ],
    name: 'Астероидный альфа-сахаридный люминесцентный флюоресцентный традиционный-галактический минеральный бургер',
    number: 10870,
    status: 'done',
    updatedAt: '2022-03-01T01:36:55.142Z',
    _id: '621d78b625b9a4001b6e1d14',
    totalPrice: 8183,
  }],
  success: true,
  total: 10783,
  totalToday: 53,
};
