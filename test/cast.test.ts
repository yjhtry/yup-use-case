import { assert, describe, expect, it } from 'vitest'

import { date, number, object, string } from 'yup'

describe('test yup cast', () => {
  const userSchema = object({
    name: string().required(),
    age: number().required().positive().integer(),
    email: string().email(),
    website: string().url().nullable(),
    createdOn: date().default(() => new Date()),
  })

  it('name should be required', () => {
    expect(userSchema.validate({})).rejects.toThrow()
  })

  it('age should be positive', () => {
    expect(userSchema.validate({
      name: 'jimmy',
      age: -24,
    })).rejects.toThrow()
  })

  it('website should be a url', () => {
    expect(userSchema.validate({
      name: 'jimmy',
      age: 24,
      website: 'google.com',
    })).rejects.toThrow()
  })

  it('basic type should be cast as default', () => {
    assert.deepStrictEqual(
      userSchema.cast({
        name: 'jimmy',
        age: '24',
        createdOn: '2014-09-23T19:25:25Z',
      })
      , {
        name: 'jimmy',
        age: 24,
        createdOn: new Date('2014-09-23T19:25:25Z'),
      },
    )
  })

  it('basic type shouldn\'t be cast as strict mode', () => {
    expect(userSchema.validate(
      {
        name: 'jimmy',
        age: '24',
      },
      { strict: true },
    )).rejects.toThrow()
  })
})
