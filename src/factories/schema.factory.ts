import type { SchemaFields, Schema, ExtractSchemaFieldsType } from '@/protocols'
import type { ValidateErrorMap } from '@rockparty/validator'

export const schema = <T extends SchemaFields>(schemaFields: T): Schema<T> => ({
  schemaFields,
  validate: async (
    x: ExtractSchemaFieldsType<T>,
    opts: { once?: boolean } = {},
  ) => {
    const { once } = opts

    let errors: ValidateErrorMap | undefined = undefined

    for (const k in schemaFields) {
      const { validator } = schemaFields[k]
      errors = await validator?.validate(x[k], once, k, [k], errors)
      if (errors && once) return errors
    }

    return errors
  },
})
