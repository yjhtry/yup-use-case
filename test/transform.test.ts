import { describe, expect, it } from 'vitest'
import { object, string } from 'yup'

describe('test yup transform', () => {
  it('object transform should success', () => {
    expect(object({
      firstName: string().lowercase().trim(),
    })
      .json()
      .camelCase()
      .cast('{"first_name": "jAnE "}')).deep.eq({ firstName: 'jane' })
  })

  it('custom transform should success', () => {
    expect(string().transform(cv => cv.trim()).cast('  jane  ')).eq('jane')
  })
})
