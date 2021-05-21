import { schema, schemaField } from '@/factories'
import { fAny, fString, fUnknown } from '@/factories/fields'
import { ExtractSchemaType } from '@/protocols'
import {
  anyValidatorDecorator,
  createArrayValidator,
  isNumberValidator,
  isObjectValidator,
  isStringValidator,
  stringHasMinLength,
} from '@rockparty/validator'
import { printIfNotExpected } from './__helpers__'

describe('Schema', () => {
  const makeSut = () => ({
    sut: schema({
      foo: fString({
        validator: createArrayValidator(
          isStringValidator,
          stringHasMinLength(2),
        ),
      }),
      bar: fUnknown({
        validator: anyValidatorDecorator(isNumberValidator),
      }),
      foobar: fAny({
        validator: isObjectValidator,
      }),
    }),
    valid: { foo: 'foo', bar: 0, foobar: { foo: 'bar' } },
    invalid: { foo: '', bar: '', foobar: '' },
  })

  it('should return undefined', async () => {
    const { sut, valid } = makeSut()
    type Foo = ExtractSchemaType<typeof sut>
    const foo: Foo = valid
    const result = await sut.validate(foo)
    const expected = result === undefined
    printIfNotExpected(expected, result)
    expect(expected).toBe(true)
  })

  it('should validate return single error', async () => {
    const { sut, invalid } = makeSut()
    const result = await sut.validate(invalid, { once: true })
    const expected = !!result && result.size === 1
    printIfNotExpected(expected, result)
    expect(expected).toBe(true)
  })

  it('should validate return multiple errors', async () => {
    const { sut, invalid } = makeSut()
    const result = await sut.validate(invalid, { once: false })
    const expected = !!result && result.size > 1
    printIfNotExpected(expected, result)
    expect(expected).toBe(true)
  })
})
