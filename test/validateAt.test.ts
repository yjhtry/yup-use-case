import { describe, expect, it } from 'vitest'
import { array, boolean, object, string } from 'yup'

describe('test yup validateAt', async () => {
  const schema = object({
    foo: array().of(
      object({
        loose: boolean().required(),
        bar: string().when('loose', {
          is: true,
          otherwise: schema => schema.strict(),
        }),
      }),
    ),
  })

  const rootValue = {
    foo: [{ bar: 1 }, { bar: 1, loose: true }],
  }

  it('should work', () => {
    expect(schema.validateAt('foo[1].bar', rootValue)).resolves.toBe('1')
  })

  it('should throw ValidateError', () => {
    expect(schema.validateAt('foo[0].bar', rootValue)).rejects.toThrow()
  })
})
