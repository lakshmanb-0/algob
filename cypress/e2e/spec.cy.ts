describe('template spec', () => {

  // login in before every test 
  beforeEach(() => {
    cy.visit('http://localhost:3000/log-in');
    cy.wait(5000);
    cy.get('[data-testid=LoginUsername]').type('asd');
    cy.get('[data-testid=LoginPassword]').type('asd');
    cy.get('[data-testid=LoginBtn]').click();
    cy.wait(5000);
    cy.visit('http://localhost:3000');
  })


  // signup 
  it('signUp check', () => {
    cy.visit('http://localhost:3000/sign-up');
    cy.wait(5000);

    cy.get('[data-testid=signUpEmail]').type('a1@gmail.com');
    cy.get('[data-testid=signUpUsername]').type('a1');
    cy.get('[data-testid=signUpImage]').type('/avatar_3.avif').type('{enter}');
    cy.get('[data-testid=signUpName]').type('a1');
    cy.get('[data-testid=signUpPassword]').type('a1');
    cy.get('[data-testid=signUpConfirmPassword]').type('a1');

    cy.get('[data-testid=signUpBtn]').click()
    cy.wait(10000);
    cy.visit('http://localhost:3000');
  })


  // create Post 
  it('create Post', () => {
    cy.get('[data-testid=postText]').type('One punch Man')
    cy.get('[data-testid=createPostBtn]').click()
    cy.wait(5000);
  })

  //card 
  it('Home Card Component', () => {
    // like and bookmark 
    cy.get('[data-testid=likePost]').click()
    cy.wait(5000);
    cy.get('[data-testid=BookmarkPost]').click()
    cy.wait(5000);
    cy.get('[data-testid=unlikePost]').click()
    cy.wait(5000);
    cy.get('[data-testid=unBookmarkPost]').click()
    cy.wait(5000);

    // comment 
    cy.get('[data-testid=commentClick]').click()
    cy.wait(2000)
    cy.get('[data-testid=commentInput]').type('Itadori')
    cy.get('[data-testid=addComment]').click()
    cy.wait(5000)
    cy.get('[data-testid=CancelComment]').click()
    cy.wait(2000)

    // update post 
    cy.get('[data-testid=updatePost]').click()
    cy.wait(2000)
    cy.get('[data-testid=postInput]').clear().type('shhhh! new post')
    cy.get('[data-testid=updateBtn]').click()
    cy.wait(3000)
    cy.get('[data-testid=updatePost]').click()
    cy.wait(2000)
    cy.get('[data-testid=cancelInput]').click()
    cy.wait(3000)


    // delete post 
    cy.get('[data-testid=deletePost]').click()
    cy.get('[data-testid=Confimrdelete]').click()
    cy.wait(5000)
  })

  // liked page 
  it('liked Page', () => {
    cy.get('[data-testid=likePage]').click()
    cy.wait(5000);
  })

  // bookmark page 
  it('bookmark Page', () => {
    cy.get('[data-testid=bookmarkPage]').click()
    cy.wait(5000);
  })

  // myPosts page 
  it('myPosts Page', () => {
    cy.get('[data-testid=myPosts]').click()
    cy.wait(5000);
    cy.get('[data-testid=deletePostPage]').click()
    cy.wait(4000);
    cy.reload();
    cy.get('[data-testid=expandComment6572c8896c0d50619cc1bf47]').click()
    cy.wait(1000);
    // delete post 
    cy.get('[data-testid=deletePost]').click()
    cy.get('[data-testid=Confimrdelete]').click()
    cy.wait(5000);
  })

  // myPosts page 
  it('profile Page', () => {
    cy.get('[data-testid=profilePage]').click()
    cy.wait(5000);

    cy.get('[data-testid=profileEmail]').clear().type('a1@gmail.com');
    cy.get('[data-testid=profileUsername]').clear().type('a1');
    cy.get('[data-testid=profileimage]').clear().type('/avatar_3.avif').type('{enter}');
    cy.get('[data-testid=profileName]').clear().type('a1');

    cy.get('[data-testid=profileBtn]').click()
    cy.wait(10000);

  })

  // logout Post 
  it('logout Post', () => {
    cy.get('[data-testid=logoutBtn]').click()
    cy.wait(5000);
  })


})                          