describe('Cadastro de Autor', () => {
  before(() => {
    cy.task('seedDatabase');
  });
  it('deve cadastrar um novo autor com sucesso', () => {
    cy.visit('http://localhost:3000/author/new'); 

    
    cy.get('input[name="name"]').type('Autor Cypress');

    
    cy.get('form').submit();

   
    cy.url().should('include', '/author'); 
  });
});
