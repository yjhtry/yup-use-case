import { describe, expect, it } from 'vitest'
import { array, object, reach, string } from 'yup'

describe('test yup reach', () => {
  it('should reach nested arr schema', () => {
    const stringSchema = string()

    const schema = object({
      nested: object({
        arr: array(stringSchema),
      }),
    })

    expect(reach(schema, 'nested.arr[1]')).toBe(stringSchema)
  })
})
