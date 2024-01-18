import { describe, expect, it } from 'vitest'
import { ValidationError, number, object, string } from 'yup'

describe('test yup when function depend on one field', () => {
  // when name is test, age should be greater than 18, otherwise age should be greater than 100
  const schema = object({
    name: string().required(),
    age: number().when(['name', 'friend.age'], {
      is: (name: string) => name === 'test',
      then: schema => schema.min(18),
      otherwise: schema => schema.min(100),
    }),
  })

  it('should work', () => {
    expect(schema.validateSync({
      name: 'test',
      age: 18,
    })).toEqual({
      name: 'test',
      age: 18,
    })
  })

  it('should throw error', () => {
    expect(() => schema.validateSync({
      name: 'prod',
      age: 18,
    })).toThrow(ValidationError)
  })
})

describe('test yup when function depend on fields', () => {
  // when name is test and friend.age is not undefined or friend.age be greater 18, age should be greater than 18, otherwise age should be greater than 100
  const schema = object({
    name: string().required(),
    friend: object({
      age: number(),
    }).default(undefined),
    age: number().when(['name', 'friend.age'], {
      is: (name: string, age: number) => name === 'test' && (age !== undefined ? (age >= 18) : true),
      then: schema => schema.min(18),
      otherwise: schema => schema.min(100),
    }),
  })

  it('should work when friend.age satisfy the condition', () => {
    expect(schema.validateSync({
      name: 'test',
      friend: {
        age: 18,
      },
      age: 18,
    })).toEqual({
      name: 'test',
      friend: {
        age: 18,
      },
      age: 18,
    })
  })

  it('should work when friend.age absent', () => {
    expect(schema.validateSync({
      name: 'test',
      age: 18,
    })).toEqual({
      name: 'test',
      age: 18,
    })
  })

  it('should throw error when friend not satisfy the condition', () => {
    expect(() => schema.validateSync({
      name: 'test',
      friend: {
        age: 11,
      },
      age: 99,
    })).toThrow(ValidationError)
  })
})
