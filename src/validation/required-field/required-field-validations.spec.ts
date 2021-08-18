import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'
import Faker from 'faker'

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return false if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate(Faker.random.word())
    expect(error).toBeFalsy()
  })
})
