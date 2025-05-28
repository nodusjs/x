import { describe, it, expect } from 'vitest'
import { style } from './style.js'

describe('button style', () => {
  it('gera o CSS esperado com valores padrão', () => {
    const button = {
      color: 'brand',
      variant: 'solid',
      size: 'md',
      onlyIcon: false,
      width: 'auto',
    }

    const { cssRules: [{ cssText }]} = style(button)
    expect(cssText).toMatchSnapshot()
  })

  it('gera o CSS esperado com valores customizados e onlyIcon', () => {
    const button = {
      color: 'error',
      variant: 'ghost',
      size: 'xl',
      onlyIcon: true,
      width: '100px',
    }

    const { cssRules: [{ cssText }]} = style(button)
    expect(cssText).toMatchSnapshot()
  })
})
