describe('template spec', () => {

  // login check 
  it('login check', () => {
    cy.visit('http://localhost:3000/log-in');
    cy.wait(6000);

    cy.get('[data-testid=LoginUsername]').type('asd');
    cy.get('[data-testid=LoginPassword]').type('asd');

    cy.get('[data-testid=LoginBtn]').click();
    cy.wait(10000);

    cy.visit('http://localhost:3000');

    cy.get('[data-testid=postCreateBar]').should('exist');
  })

  it('signUp check', () => {
    // Visit the page with the form
    cy.visit('http://localhost:3000/log-in');
    cy.wait(6000);

    // Submit the form
    cy.get('[data-testid=login-to-sign]').click();
    cy.wait(4000);

    // Wait for the redirect to happen (adjust the URL as needed)
    cy.visit('http://localhost:3000/sign-up');

    // Optionally, you can also assert elements on the home page to confirm the redirect
    cy.get('[data-testid=postCreateBar]').should('exist');
  })

})                             