import { describe, expect, it } from 'vitest'
import { array, lazy, mixed, number, object, string } from 'yup'

describe('test yup lazy', () => {
  it('recursive should work', () => {
    const menu: any = object({
      name: string().required(),
      path: string().required(),
      children: array().of(lazy(() => menu.default([]))),
    })

    expect(menu.validateSync({
      name: 'root',
      path: '/',
      children: [
        {
          name: 'home',
          path: '/home',
          children: [],
        },
      ],
    })).toEqual({
      name: 'root',
      path: '/',
      children: [
        {
          name: 'home',
          path: '/home',
          children: [],
        },
      ],
    })
  })

  it('dynamic should work', () => {
    const item = lazy((value) => {
      switch (typeof value) {
        case 'number':
          return number()
        case 'string':
          return string()
        default:
          return mixed()
      }
    })

    const list = array().of(item)
    expect(list.validateSync([1, '2', 3])).toEqual([1, '2', 3])
  })
})
