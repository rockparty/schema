import { createSchema, ExtractType, schemaField } from '@rockparty/schema'
import {
  anyValidatorDecorator,
  createArrayValidator,
  isNumberValidator,
  isStringValidator,
  stringHasMinLength,
} from '@rockparty/validator'

const fooSchema = createSchema({
  foo: schemaField<string>({
    validator: createArrayValidator(isStringValidator, stringHasMinLength(4)),
  }),
  bar: schemaField<unknown>({
    validator: anyValidatorDecorator(isNumberValidator),
  }),
})

type FooSchema = typeof fooSchema['schemaFields']

type Foo = ExtractType<FooSchema>

const foo: Foo = {
  foo: false as unknown as string,
  bar: 'bar',
}

fooSchema.validate(foo, { once: false }).then((result) => {
  console.dir(result, { depth: null })
})
