describe('Note app', () => {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('login fails with wrong password', function() {
    cy.get('#username').type("mluukkai")
    cy.get('#password').type("invalid password")
    cy.get('#login-button').click()
    cy.contains('invalid username or password')
  })

  it('log in with valid username or password', function() {
    cy.get('#username').type("mluukkai")
    cy.get('#password').type("salainen")
    cy.get('#login-button').click()
    cy.contains('Logged in as mluukkai')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.contains('New Note').click()
        cy.contains('save').click()
      })
    })
  })
})
