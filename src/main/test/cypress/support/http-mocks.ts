import { Method } from 'axios'
import faker from 'faker'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept('POST',url, {
    statusCode: 401,
    body: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockEmailInUseError = (url: RegExp): void => {
  cy.intercept('POST',url, {
    statusCode: 403,
    body: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockUnexpectedError = (method: Method, url: RegExp): void => {
  cy.intercept(method,url, {
    statusCode: 400,
    body: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockOk = (method: Method, url: RegExp, response: any): void => {
  cy.intercept('POST',/login/, {
    statusCode: 200,
    ...response
  }).as('request')
}
