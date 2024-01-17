import { describe, expect, it } from 'vitest'
import { object, string } from 'yup'

/**
 * yup describe get schema description
 */

describe('test yup describe', () => {
  it('should work', () => {
    const schema = object({
      name: string().required(),
    }).label('test describe').meta({
      type: 'test',
    }).default({ name: 'default', customKey: 11 })

    const description = schema.describe()

    console.log(description)

    expect(schema.describe().default).toEqual({
      name: 'default',
      customKey: 11,
    })

    expect(schema.describe().meta).toEqual({
      type: 'test',
    })

    expect(schema.describe().label).toEqual('test describe')
  })
})
