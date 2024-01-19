import { describe, expect, it } from 'vitest'
import { string } from 'yup'

/**
 * if schema not use `from` or other method to transform input data, validate* method will return the input data
 * so we can use expect(schema.validate*(data)).toEqual(data) to test schema
 * when use transform method, when should use assert.deepEqual(schema.validate*(data), transformedData)
 */

describe('test yup validate', () => {
  it('validate should be rejected', () => {
    expect(string()
      .min(3, 'must be at least 3 characters long')
      .email('must be a valid email')
      .validate('no')).rejects.toThrow()
  })

  it('validate should be resolved', () => {
    expect(string()
      .min(3, 'must be at least 3 characters long')
      .email('must be a valid email')
      .validate('888888@qq.com')).resolves.toBe('888888@qq.com')
  })
})
