import { assert, describe, expect, it } from 'vitest'
import { number, object, string } from 'yup'

describe('test yup noUnknown', async () => {
  it('should work when default', () => {
    const schema = object({
      name: string().required(),
      age: number().required(),
    })

    expect(schema.validateSync({ name: 'john', age: 22, other: 11 })).toEqual({ name: 'john', age: 22, other: 11 })
  })

  it('should throw error when use noUnknown', () => {
    const schema = object({
      name: string().required(),
      age: number().required(),
    }).noUnknown()

    assert.deepEqual(schema.validateSync({ name: 'john', age: 22, other: 11 }), { name: 'john', age: 22 })
  })
})
