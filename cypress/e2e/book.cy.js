describe('Formulário de novo livro', () => {
   before(() => {
    cy.task('seedDatabase');
  });

  it('deve cadastrar um novo livro com sucesso', () => {
    cy.visit('http://localhost:3000/book/new'); 

    cy.get('input[name="titulo"]').type('Dom Casmurro');
    cy.get('select[name="author_id"]').select('1'); 

    cy.get('form').submit();

    cy.url().should('include', '/book'); 
  });
});