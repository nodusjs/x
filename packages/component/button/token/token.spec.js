import { describe, it, expect } from 'vitest'
import { token } from './token.js'

describe('token', () => {
  it('gera o bloco de tokens CSS esperado', () => {
    const { cssRules: [{ cssText }]} = token()
    expect(cssText).toMatchSnapshot()
  })
})
