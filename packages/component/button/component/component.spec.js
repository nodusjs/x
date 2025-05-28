import { describe, it, expect } from 'vitest'
import { component } from './component.js'

describe('component', () => {
  it('deve gerar a string HTML esperada', () => {
    const htmlString = component()
    expect(htmlString).toMatchSnapshot()
  })
})
