import { assert, describe, it } from 'vitest'
import { number, object, string } from 'yup'

describe('test yup form', async () => {
  it('should work', () => {
    const schema = object({
      name1: string().required(),
      age1: number().required(),
    }).from('name', 'name1').from('age', 'age1')

    /**
     * if schema not use `from` or other method to transform input data, validate* method will return the input data
     * so we can use expect(schema.validate*(data)).toEqual(data) to test schema
     * when use transform method, when should use assert.deepEqual(schema.validate*(data), transformedData)
     */
    assert.deepEqual(schema.validateSync({ name: 'john', age: 22 }), { name1: 'john', age1: 22 })
  })

  it('should work when use alias', () => {
    const schema = object({
      name1: string().required(),
      age1: number().required(),
    }).from('name', 'name1').from('age', 'age1', true)

    assert.deepEqual(schema.validateSync({ name: 'john', age: 22 }), { name1: 'john', age1: 22, age: 22 } as any)
  })
})
