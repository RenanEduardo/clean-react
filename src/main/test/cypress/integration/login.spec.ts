import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email')
      .should('have.attr','readOnly')

    cy.getByTestId('email-status')
      .should('have.attr','title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('password')
      .should('have.attr','readOnly')

    cy.getByTestId('password-status')
      .should('have.attr','title', 'Campo obrigatório')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr','disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr','title', 'Campo inválido')
      .should('contain.text', '🔴')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status')
      .should('have.attr','title', 'Campo inválido')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr','disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr','title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-status')
      .should('have.attr','title', 'Tudo certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr','disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST',/login/, {
      statusCode: 401,
      body: {
        error: faker.random.words()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text','Credenciais inválidas')
    cy.url().should('eq',`${baseUrl}/login`)
  })

  it('Should present UnexpectedError on 400', () => {
    cy.intercept('POST',/login/, {
      statusCode: 400,
      body: {
        error: faker.random.words()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text','Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('eq',`${baseUrl}/login`)
  })

  it('Should present UnexpectedError if invalid data is provided', () => {
    cy.intercept('POST',/login/, {
      statusCode: 200,
      body: {
        invalidProperty: faker.datatype.uuid()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text','Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('eq',`${baseUrl}/login`)
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST',/login/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid()
      }
    })
    cy.getByTestId('email').focus().type('mango@gmail.com')
    cy.getByTestId('password').focus().type('12345')
    cy.getByTestId('submit').click()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.url().should('eq',`${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})