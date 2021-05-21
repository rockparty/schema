import type { SchemaField, SchemaFieldFactoryFn } from '@/protocols'

export const schemaField =
  <T>(): SchemaFieldFactoryFn<T> =>
  (schema: SchemaField<T>): SchemaField<T> =>
    schema
