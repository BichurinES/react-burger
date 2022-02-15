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

export const DEFAULT_ERR_MSG = 'Ошибка сервера';
export const DEFAULT_SUCCESS_MSG = 'Данные успешно отправлены';
export const DEFAULT_REQUEST_ERR_MSG = 'Ошибка запроса! Данные не получены';
export const BUN_REQUIRED_ERR_MSG = 'Перед добавлением ингредиентов, сначала нужно выбрать булку для будущего бургера';
export const TOKEN_ERR_MSG = 'Ошибка получения токена, неоходимо повторно пройти авторизацию';

export const HEADER_CONSTRUCTOR_BUTTON_TEXT = 'Конструктор';
export const HEADER_ORDERS_BUTTON_TEXT = 'Лента заказов';
export const HEADER_PROFILE_BUTTON_TEXT = 'Личный кабинет';
export const CONSTRUCTOR_DEFAULT_TEXT = 'Пожалуйста, выберете булку бургера для создания заказа';
export const CONSTRUCTOR_BUTTON_TEXT = 'Оформить заказ';
export const CONSTRUCTOR_LOADING_BUTTON_TEXT = 'Оформляем...';

export const WS_FEED_URL = 'wss://norma.nomoreparties.space/orders/all';
export const WS_MY_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';
export const MAX_INGREDIETNS_IN_CARD = 6;
