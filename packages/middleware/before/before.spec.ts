import { describe, it, expect } from 'vitest'
import { before } from './before.js'

describe('before decorator', () => {
  it('invoca o hook antes do método original e retorna o valor processado pelo método', () => {
    const calls: string[] = []

    class Foo {
      @before('hook')
      multiply(x: number) {
        calls.push(`multiply:${x}`)
        return x * 3
      }

      hook(arg: number) {
        calls.push(`hook:${arg}`)
        return arg + 1
      }
    }

    const foo = new Foo()
    const result = foo.multiply(4)

    expect(calls).toEqual(['hook:4', 'multiply:5'])
    expect(result).toBe(15)
  })

  it('invoca o hook antes de um setter e preserva o comportamento de atribuição', () => {
    const calls: string[] = []

    class Bar {
      #value = 0

      get value() {
        return this.#value
      }

      @before('onSet')
      set value(v: number) {
        calls.push(`set:${v}`)
        this.#value = v
      }

      onSet(v: number) {
        calls.push(`onSet:${v}`)
        return v + 2
      }
    }

    const bar = new Bar()
    bar.value = 7

    expect(bar.value).toBe(9)
    expect(calls).toEqual(['onSet:7', 'set:9'])
  })
})
