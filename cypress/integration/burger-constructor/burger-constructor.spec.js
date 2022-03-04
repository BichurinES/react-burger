describe('Burger constructor', () => {
  before(() => cy.visit('http://localhost:3000/react-burger'));

  it('should open page of ingredient details', () => {
    // Кликаем по ингредиенту
    cy.get('[class^=ingredient_card__]').first().as('ingredient');
    cy.get('@ingredient').click();
    // Проверяем, что информация открылась
    cy.contains('Детали ингредиента');
    cy.contains('булка');
    // Закрываем окно
    cy.get('body').type('{esc}');
  });

  it('should add ingredients to the cart', () => {
    const dataTransfer = new DataTransfer();
    cy.get('[class^=ingredient_card__]').first().as('bun');
    cy.get('[class^=ingredient_card__]').eq(10).as('main');
    cy.get('[class^=burger-constructor_constructor__]').as('dropContainer');

    // Добавляем булку
    cy.get('@bun').trigger('dragstart', { dataTransfer });
    cy.get('@dropContainer')
      .trigger('drop', { dataTransfer })
      .should('contain', 'Оформить заказ'); // Проверяем, что появилась кнопка "Оформить заказ"
    // Проверяем, что в заказ добавлено 2 булки - верхняя и нижняя
    cy.get('[class^=bun-constructor-element_list-item__]').should('have.length', 2);
    // Проверяем счетчик ингредиента
    cy.get('@bun').get('[class^=counter_counter__]').should('contain', 1);

    // Добавляем основной ингредиент
    cy.get('@main').trigger('dragstart', { dataTransfer });
    cy.get('@dropContainer').trigger('drop', { dataTransfer });
    // Проверяем, что она действительно добавилась в конструктор
    cy.get('[class^=main-constructor-element_list-item__]').should('have.length', 1);
    // Проверяем счетчик ингредиента
    cy.get('@main').get('[class^=counter_counter__]').should('contain', 1);
  });

  it('should redirect on login page', () => {
    cy.get('[class^=button_button__]').click();
    // Проверяем переадресацию на страницу ввода логина по нажатию
    // на кнопку "Оформить заказ", так как еще не прошли аутентификацию
    cy.contains('Вход');
  });

  it('should successfully login and create new order', () => {
    // Заполняем поля тестовыми данными
    cy.get('[name=email').type('123@abc.ru');
    cy.get('[name=password').type('11111111');
    cy.get('[class^=button_button__]').click();

    // Проверяем, что вернулись на страницу конструктора
    cy.contains('Соберите бургер');
    // Проверяем наличие токена
    cy.getCookie('accessToken').should('exist');

    // Отправляем заказ
    cy.get('[class^=button_button__]').click();
    cy.getCookie('accessToken').should('exist');

    // Номер заказа получен
    cy.get('[class^=order-details_order-id__]')
      .should('be.visible')
      .should('not.be.empty');
  });
});
