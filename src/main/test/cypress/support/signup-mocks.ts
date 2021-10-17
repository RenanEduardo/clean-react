import * as Helper from './http-mocks'
import faker from 'faker'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(/signup/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError('POST',/signup/)
export const mockInvalidData = (): void => Helper.mockOk('POST', /signup/, { body: { invalid: faker.datatype.uuid() } })
