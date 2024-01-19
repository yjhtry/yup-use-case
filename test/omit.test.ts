import { describe, expect, it } from 'vitest'
import { number, object, string } from 'yup'

describe('test yup omit', async () => {
  it('should work', () => {
    const schema = object({
      name: string().required(),
      age: number().required(),
    }).omit(['name'])

    expect(schema.validate({ name: 'john' })).rejects.toThrow()
  })
})
