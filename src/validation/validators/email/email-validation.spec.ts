import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import Faker from 'faker'

const makeSut = (): EmailValidation => new EmailValidation(Faker.database.column())

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(Faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(Faker.internet.email())
    expect(error).toBeFalsy()
  })
})