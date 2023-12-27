// 5.17
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    // create user
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user1 = {
      name: 'Jack',
      username: 'jack',
      password: '123456'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user1)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  // 5.18
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type("mluukkai")
      cy.get('#password').type("salainen")
      cy.get('#login-button').click()
      cy.contains('Logged in as mluukkai')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type("mluukkai")
      cy.get('#password').type("invalid password")
      cy.get('#login-button').click()
      cy.contains('invalid username or password')
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 255, 255)')
        .and('have.css', 'padding', '4px')

      cy.get('html').should('not.contain', 'Logged in as mluukkai')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })

      // create blog
      cy.createNote({ title: 'first title', author: 'first author', url: 'first url', content: 'first content', important: false })
      cy.createNote({ title: 'second title', author: 'second author', url: 'second url', content: 'second content', important: false })
      cy.createNote({ title: 'third title', author: 'third author', url: 'third url', content: 'third content', important: false })
    })

    // 5.19
    it('A blog can be created', function() {
      cy.contains('New Note').click()
      cy.get('#title').type("test title")
      cy.get('#author').type("test author")
      cy.get('#url').type("test url")
      cy.get('#content').type("test content")
      cy.get('#create-blog-button').click()

      cy.contains('test title')
        .contains('showDetail')
    })

    // 5.20
    it('A blog can be liked by user', function() {
      cy.contains('first title')
        .contains('showDetail')
        .click()

      cy.contains('likes').click()
      cy.contains('likes:1')
    })

    // 5.21
    it('A blog can be deleted by user', function() {
      cy.contains('first title')
        .contains('showDetail')
        .click()

      cy.contains('Delete').click()
      cy.contains('first title').should('not.exist')
    })

    // 5.22
    it('A blog delete button can be viewed by creator', function() {
      cy.contains('Logout').click()
      cy.login({ username: 'jack', password: '123456' })
      cy.visit('')

      cy.contains('first title')
        .contains('showDetail')
        .click()

      cy.contains('Delete').should('not.exist')
    })

    // 5.23
    it('The blogs should be sorted by likes', function() {
      cy.get('.blog').eq(0).should('contain', 'first title')
      cy.get('.blog').eq(1).should('contain', 'second title')

      cy.contains('second title')
        .contains('showDetail')
        .click()

      cy.contains('likes').click()
      cy.get('.blog').eq(0).should('contain', 'second title')
      cy.get('.blog').eq(1).should('contain', 'first title')
    })
  })
})
