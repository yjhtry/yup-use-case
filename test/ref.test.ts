import { describe, expect, it } from 'vitest'
import { number, object, string } from 'yup'

describe('test yup ref', () => {
  it('ref age should work', () => {
    expect(object({
      age: number(),
      name: string().required(),
      weight: number().required().positive().integer(),
    }).validateSync({
      age: 24,
      name: 'jimmy',
      weight: 200,
    })).toEqual({
      age: 24,
      name: 'jimmy',
      weight: 200,
    })
  })
})
