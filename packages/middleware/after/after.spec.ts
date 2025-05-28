import { describe, it, expect } from 'vitest'
import { after } from './after.js'

describe('after decorator', () => {
  it('invoca o hook após o método original e retorna o valor do hook', () => {
    const calls = [];
    class Foo {
      @after('hook')
      multiply(x) {
        calls.push(`multiply:${x}`)
        return x * 3
      }

      hook(result) {
        calls.push(`hook:${result}`)
        return result + 1
      }
    }

    const foo = new Foo()
    const retorno = foo.multiply(4)

    expect(retorno).toBe(13)
    expect(calls).toEqual(['multiply:4', 'hook:12'])
  })

  it('invoca o hook após um setter e preserva o comportamento original', () => {
    const calls = [];

    class Bar {
      #value = 0

      get value() {
        return this.#value
      }

      @after('hook')
      set value(v) {
        calls.push(`set:${v}`)
        this.#value = v
      }

      hook() {
        calls.push('onSet')
        return this
      }
    }

    const bar = new Bar()
    bar.value = 7

    expect(bar.value).toBe(7)
    expect(calls).toEqual(['set:7', 'onSet'])
  })
})
