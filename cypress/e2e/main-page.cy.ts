require('@4tw/cypress-drag-drop');

describe('main page works fine', function () {

  it('should open modal with details of the ingredient', function () {
    cy.visit('http://localhost:3000');
    cy.get('#bun li:first-child').click();
    cy.get('#modal-close-icon').click();
  });

  it('should drag-and-drop ingredients and make order with them', function () {
    cy.visit('http://localhost:3000');
    cy.get('#bun li:first-child').drag('#burger-constructor');
    cy.get('#sause li:first-child').drag('#burger-constructor');
    cy.get('#main li:first-child').drag('#burger-constructor');
    cy.get('button').contains('Оформить заказ').click();
    cy.get('[name="email"]').type('cat@cat.cat');
    cy.get('[name="password"]').type('cat123');
    cy.get('button').contains('Войти').click();
    cy.get('button').contains('Оформить заказ').click();
    cy.wait('20000');
    cy.get('#modal-close-icon').click();
  });

}); 