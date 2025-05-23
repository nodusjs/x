import { describe, it, expect } from 'vitest'
import { style } from './style.js'

describe('style', () => {
  it('gera o CSS esperado com valores padrão', () => {
    const text = {
      size:    'md',
    }

    const { cssRules: [{ cssText }]} = style(text)
    expect(cssText).toMatchSnapshot()
  })
})
