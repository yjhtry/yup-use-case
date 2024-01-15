import { describe, expect, it } from 'vitest'
import { number, object, string } from 'yup'

describe('test yup test function', () => {
  it('custom test should return resolved promise', () => {
    expect(string()
      .trim()
      .test('had trim', d => `${d.path} not trim`, value => !value?.startsWith(' ')).validate(' 123'))
  })

  it('custom test should be rejected', () => {
    const order = object({
      no: number().required(),
      sku: string().test({
        name: 'is-sku',
        skipAbsent: true,
        test(value, ctx) {
          if (!value!.startsWith('s-'))
            return ctx.createError({ message: 'SKU missing correct prefix' })

          if (!value!.endsWith('-42a'))
            return ctx.createError({ message: 'SKU missing correct suffix' })

          if (value!.length < 10)
            return ctx.createError({ message: 'SKU is not the right length' })

          return true
        },
      }),
    })

    expect(order.validate({ no: 1234, sku: 's-1a45-14a' })).rejects.toThrow()
  })

  it('custom test and set skipAbsent false should be rejected', () => {
    const order = object({
      no: number().required(),
      sku: string().test({
        name: 'ski-not-absent',
        skipAbsent: false, // when skipAbsent is false, the test function will be called.
        test(value, ctx) {
          if (value === undefined)
            return ctx.createError({ message: 'SKU is absent' })

          return true
        },
      }),
    })

    expect(order.validate({ no: 1234 })).rejects.toThrow()
  })
})
