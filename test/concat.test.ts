import { describe, expect, it } from 'vitest'
import { string } from 'yup'

/**
 * concat method will concat the same instance schema
 */

describe('test yup contact', async () => {
  it('should work when concat', () => {
    const schema = string().length(3).concat(string().required())

    expect(schema.validate(undefined)).rejects.toThrow()
    expect(schema.validate('3333')).rejects.toThrow()
  })
})
