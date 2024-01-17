

describe('Login Test', () => {
  it('successfully logs in and redirects to the home page', async () => {
    // Step 1: Visit the login page
    cy.visit('/login'); 

    // Step 2: Fill in the login form
    cy.get('input[formControlName=email]').type('jovana@example.com'); // Use a test email
    cy.get('input[formControlName=password]').type('12345'); // Use a test password



    // Step 3: Submit the form
    cy.get('button').click({force: true});
    cy.wait(3000);


    cy.url().should('include', '/books');
  
  });
});


describe('Book Page', () => {
  beforeEach(() => {
    cy.login('jovana@example.com', '12345');
    cy.wait(10000);

  });

  it('should go to home page', () => {


    cy.visit('/books');
    cy.get('.book-item').should('have.length', 10); 
  
  });

  it('shoud add to favorites', () => {
    

    cy.visit('/books');
    cy.get('.book-item').first().find('button').click();

    cy.wait(5000);


    cy.window().then((w: any) => {
      // @ts-ignore
      const store = w.store;
      const actions = store.actionsObserver._value;
      const favorites = actions.favoriteBook;

      expect(favorites.id).equal('https://anapioficeandfire.com/api/books/1');
    })


  })


  it('shoud add to favorites and remove it', () => {
    

    cy.visit('/books');
    cy.get('.book-item').first().find('button').click();

    cy.wait(2000); 
    cy.get('.book-item').first().find('button').click();

    cy.window().then((w: any) => {
      // @ts-ignore
      const store = w.store;
      const actions = store.actionsObserver._value;
      const favorites = actions.type;

      expect(favorites).equal('[Favorites] Remove from Favorites');
    })


  })
})

