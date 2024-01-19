import { describe, expect, it } from 'vitest'
import { number, object, string } from 'yup'

/**
 * the shape method like Object.assign, it will merge the schema
 * if the key is same, the later schema will overwrite the previous schema and merge validate rules
 */

describe('test yup oneOf', async () => {
  it('should work when simple merge', () => {
    const schema = object({
      name: string().required(),
    }).shape({
      age: number().required(),
    })

    expect(schema.validateSync({ name: 'john', age: 22 })).toEqual({ name: 'john', age: 22 })
  })

  it('should throw error when merge rules on same key', () => {
    const schema = object({
      name: string().required(),
    }).shape({
      age: number().required(),
      name: string().length(3),
    })

    expect(schema.validate({ name: 'john', age: 22 })).rejects.toThrow()
  })
})
