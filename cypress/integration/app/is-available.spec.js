describe('service is available', () => {
  it('should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000/react-burger');
  });
});
