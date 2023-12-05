describe('template spec', () => {

  // login check 
  it('xTweet Test', () => {
    // login 
    cy.visit('http://localhost:3000/log-in');
    cy.wait(5000);
    cy.get('[data-testid=LoginUsername]').type('asd');
    cy.get('[data-testid=LoginPassword]').type('asd');
    cy.get('[data-testid=LoginBtn]').click();
    cy.wait(5000);
    cy.visit('http://localhost:3000');

    // create post 
    cy.get('[data-test-id=postText]').type('might hero')
    cy.get('[data-test-id=createPostBtn]').click()

    cy.wait(5000);

    cy.visit('http://localhost:3000/like');
    cy.wait(5000);

    cy.visit('http://localhost:3000/bookmark');
    cy.wait(5000);

    cy.visit('http://localhost:3000/my-posts');
    cy.wait(5000);

    cy.visit('http://localhost:3000/profile');
    cy.wait(5000);

  })

  // it('signUp check', () => {
  //   cy.visit('http://localhost:3000/log-in');
  //   cy.wait(5000);
  //   cy.get('[data-testid=login-to-sign]').click();
  //   // it not working
  //   // after this click it reload page then useEffect of layout run and redirect to /login because of no user
  //   cy.get('[data-testid=signUpEmail]').type('asd@gmail.com');
  //   cy.get('[data-testid=signUpUsername]').type('asd');
  //   cy.get('[data-testid=signUpImage]').select('/avatar_3.avif')
  //   cy.get('[data-testid=signUpName]').type('asd');
  //   cy.get('[data-testid=signUpPassword]').type('asd');
  //   cy.get('[data-testid=signUpConfirmPassword]').type('asd');

  //   cy.get('[data-testid=signUpBtn]').click()
  //   cy.visit('http://localhost:3000');
  // })
})                          