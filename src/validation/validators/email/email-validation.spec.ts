import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import Faker from 'faker'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation(Faker.random.word())
    const error = sut.validate(Faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if email is valid', () => {
    const sut = new EmailValidation(Faker.random.word())
    const error = sut.validate(Faker.internet.email())
    expect(error).toBeFalsy()
  })
})
