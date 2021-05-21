/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Validator } from '@rockparty/validator'

export interface SchemaField<T> {
  validator?: Validator<T>
}

export type SchemaFields = Record<string, SchemaField<any>>

export type ExtractSchemaFieldsType<T extends SchemaFields> = {
  [P in keyof T]: T[P] extends SchemaField<infer U> ? U : never
}

export type SchemaFieldFactoryFn<T> = (schema: SchemaField<T>) => SchemaField<T>
