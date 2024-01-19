import { describe, expect, it } from 'vitest'
import { number, object, string } from 'yup'

describe('test yup pick', async () => {
  it('should work', () => {
    const schema = object({
      name: string().required(),
      age: number().required(),
    }).pick(['name'])

    expect(schema.validateSync({ name: 'john' })).toEqual({ name: 'john' })
  })
})
