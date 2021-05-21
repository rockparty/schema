/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ValidateFnReturnType } from '@rockparty/validator'
import type {
  ExtractSchemaFieldsType,
  SchemaFields,
} from './schema-fields.protocol'

interface SchemaValidateOptions {
  once?: boolean
}

export interface Schema<T extends SchemaFields> {
  schemaFields: T
  validate: (
    x: ExtractSchemaFieldsType<T>,
    opts?: SchemaValidateOptions,
  ) => ValidateFnReturnType
}

export type ExtractSchemaType<T extends Schema<any>> = T extends Schema<infer U>
  ? ExtractSchemaFieldsType<U>
  : never
