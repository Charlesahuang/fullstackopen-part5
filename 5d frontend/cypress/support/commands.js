// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('createNote', ({ title, author, url, content }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/notes`,
    method: 'POST',
    body: {
      title,
      author,
      url,
      content
    },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  })

  cy.visit('')
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
