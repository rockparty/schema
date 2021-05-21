/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { schemaField } from '../schema-field.factory'

export const fUnknown = schemaField<unknown>()
export const fNull = schemaField<null>()
export const fUndefined = schemaField<undefined>()
export const fFalsy = schemaField<null | undefined>()
export const fAny = schemaField<any>()
export const fString = schemaField<string>()
export const fBoolean = schemaField<boolean>()
export const fNumber = schemaField<number>()
export const fFunction = <TArgs extends any[] = any, TReturn = any>() =>
  schemaField<(...args: TArgs) => TReturn>()
export const fArray = <T>() => schemaField<T[]>()
