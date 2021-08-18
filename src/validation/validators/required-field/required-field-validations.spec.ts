import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'
import Faker from 'faker'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(Faker.database.column())

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return false if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(Faker.random.word())
    expect(error).toBeFalsy()
  })
})
