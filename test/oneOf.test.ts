import { describe, expect, it } from 'vitest'
import { mixed } from 'yup'

describe('test yup oneOf', async () => {
  const schema = mixed().oneOf(['jimmy', 42])

  it('should work', () => {
    expect(schema.validateSync(42)).toBe(42)
    expect(schema.validateSync('jimmy')).toBe('jimmy')

    // when scheme not set required, undefined is valid
    expect(schema.validateSync(undefined)).toBe(undefined)
  })

  it('should throw ValidateError', () => {
    expect(schema.validate('jimmy2')).rejects.toThrow()
  })
})
