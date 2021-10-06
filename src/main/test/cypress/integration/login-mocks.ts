import * as Helper from '../support/http-mocks'
import faker from 'faker'

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(/login/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError('POST',/login/)
export const mockOk = (): void => Helper.mockOk('POST', /login/, { body: { accessToken: faker.datatype.uuid() } })
export const mockInvalidData = (): void => Helper.mockOk('POST', /login/, { body: { invalid: faker.datatype.uuid() } })
