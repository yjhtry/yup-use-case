import { describe, expect, it } from 'vitest'
import { ValidationError, boolean, number, object, string } from 'yup'

/**
 * test when function
 * 1. when function depend on one field
 * 2. when function depend on fields
 * 3. when function additive
 * 4. when function with context
 * 5. return function use case
 */

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

describe('test yup when function additive', () => {
  const schema = object({
    name: string().required(),
    friend: string(),
    age: number().when('name', {
      is: (name: string) => name === 'test',
      then: schema => schema.min(18),
      otherwise: schema => schema.min(100),
    }).when('friend', {
      is: (friend: string) => friend === 'john',
      then: schema => schema.max(20),
      otherwise: schema => schema.max(100),
    }),
  })

  it('should work when name is test and friend is john and age in [18, 20]', () => {
    expect(schema.validate({
      name: 'test',
      friend: 'john',
      age: 18,
    })).resolves
  })

  it('should throw error when name is test and friend is john and age not in [18, 20]', () => {
    expect(schema.validate({
      name: 'test',
      friend: 'john',
      age: 21,
    })).rejects.toThrow()
  })

  it('should work when name is test and friend isn"t john and age not in [18, 20]', () => {
    expect(schema.validate({
      name: 'test',
      age: 21,
    })).rejects
  })
})

describe('test yup when function with context', () => {
  const schema = object({
    isBig: boolean(),
    count: number()
      .when('isBig', {
        is: true, // alternatively: (val) => val == true
        then: schema => schema.min(5),
        otherwise: schema => schema.min(0),
      })
      .when('$other', ([other], schema) =>
        other === 4 ? schema.max(6) : schema),
  })

  it('should work when isBig is true and not use context condition', async () => {
    expect(schema.validate({ isBig: true, count: 20 })).resolves
  })

  it('should throw error when isBig is true and not use context condition', async () => {
    expect(schema.validate({ isBig: true, count: 2 })).rejects.toThrow()
  })

  it('should throw error when isBig is true and use context condition', async () => {
    expect(schema.validate({ isBig: true, count: 8 }, { context: { other: 4 } })).rejects.toThrow()
  })

  it('should work when isBig is false and use context condition ', async () => {
    expect(schema.validate({ count: 2 }, { context: { other: 4 } })).resolves
  })

  it('should throw error when isBig is false and use context condition ', async () => {
    expect(schema.validate({ count: 8 }, { context: { other: 4 } })).rejects.toThrow()
  })
})

describe('test yup when function by return function', () => {
  const schema = object({
    isBig: boolean(),
    count: number()
      .when('isBig', ([isBig], schema) => isBig ? schema.min(5) : schema.min(0)),
  })

  it('should throw error', async () => {
    expect(schema.validate({ isBig: true, count: 2 })).rejects.toThrow()
  })
})
