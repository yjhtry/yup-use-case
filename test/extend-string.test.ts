import { describe, expect, it } from 'vitest'
import { addMethod, string } from 'yup'

declare module 'yup' {
  interface StringSchema {
    append(appendStr: string): this
  }
}

describe('test yup extend string', () => {
  it('validate should be rejected', () => {
    addMethod(string, 'append', function append(appendStr: string) {
      return this.transform(value => `${appendStr}${value}`)
    })
    expect(string()
      .append('Hello')
      .validate(' world!')).resolves.toBe('Hello world!')
  })
})
