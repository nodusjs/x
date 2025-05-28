import { describe, it, expect } from 'vitest'
import { style } from './style.js'

describe('style', () => {
  it('gera o CSS esperado com valores padrão', () => {
    const text = {
      as:      'p',
      color:   'primary',
      onBrand: false,
      size:    'md',
      weight:  'medium',
      align:   'left',
      wrap:    'wrap'
    }

    const { cssRules: [{ cssText }]} = style(text)
    expect(cssText).toMatchSnapshot()
  })

  it('gera o CSS esperado com valores customizados e on-brand', () => {
    const text = {
      as:      'p',
      color:   'secondary',
      onBrand: true,
      size:    'xl',
      weight:  'bold',
      align:   'center',
      wrap:    'no-wrap'
    }

    const { cssRules: [{ cssText }]} = style(text)
    expect(cssText).toMatchSnapshot()
  })
})
