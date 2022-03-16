# Проект - Stellar Burgers

## Описание проекта
Сайт бургерной из одной далекой-далекой галактики &#128521;

Ссылка на проект: **https://bichurines.github.io/react-burger/**

## Используемые технологии:
![](https://img.shields.io/badge/Markdown-HTML5-informational?style=flat&logo=html5&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Markdown-CSS3-informational?style=flat&logo=css3&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/APL-TS-informational?style=flat&logo=typescript&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Framework-React-informational?style=flat&logo=react&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/State%20Management-Redux-informational?style=flat&logo=redux&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Drag’n’Drop-react%E2%80%90dnd-informational?style=flat&logo=react&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Unit_test-jest-informational?style=flat&logo=jest&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/E2E%20Test-Cypress-informational?style=flat&logo=cypress&logoColor=white&color=2bbc8a)

__FRONTEND__
* __React__
  * В проекте используются функциональные компоненты
  * Управление глобальный состоянием приложения через Redux
  * Функционал регистрация и входа по логину и паролю, восстановление пароля
  * Реализован функционал live-валидации форм со стороны клиента
  * Защищенные роуты для доступа к контенту только зарегистрированных пользователей
  * Добавление ингредиентов в конструктор бургера через Drag'n'drop (react-dnd)
  * Перемещение ингредиентов внутри заказа
  * Отправка заказа и получение его номера от api
  * Редактирование данных профиля в личном кабинете
  * Просмотр всех заказов в реальном времени через протокол WebSocket
* __HTML5__
  * Семантические тэги
  * Валидная разметка
* __CSS3__
  * Стилизация компонентов через css-modules
* __Test__
  * Реализовано unit-тестирование всех редьюсеров через библиотеку Jest
  * С помощью Cypress реализовано e2e-тестирование пользовательского функционала по просмотру ингредиентов, созданию нового заказа, регистрации пользователя с его последующим входом в систему

## Команды

### `npm start`

Запуск приложения в режиме разработки.<br/>
Откройте [http://localhost:3000/react-burger](http://localhost:3000/react-burger) для просмотра проекта в браузере.

### `npm run build`

Сборка проекта.

### `npm run test`

Unit-тестирование редьюсеров

### `npx cypress open`

Запуск оболочки Cypress для e2e-тестирования

### `npm run lint`

Проверка проекта линтером.
