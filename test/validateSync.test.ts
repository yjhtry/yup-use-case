import { describe, expect, it } from 'vitest'
import { ValidationError, number } from 'yup'

describe('test yup validateSync', () => {
  it('should throw ValidationError instance', () => {
    expect(() => number().test(
      'is-42',
      'this isn\'t the number i want',
      value => value !== 42,
    ).validateSync(42)).toThrow(ValidationError)
  })

  it('should throw Error instance', () => {
    expect(() => number().test(
      'is-42',
      'this isn\'t the number i want',
      value => Promise.resolve(value !== 42),
    ).validateSync(42)).toThrow(Error)
  })
})
