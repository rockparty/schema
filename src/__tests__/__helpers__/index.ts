export const printIfNotExpected = <T>(expected: boolean, result: T) =>
  !expected && console.dir(result, { depth: null })
