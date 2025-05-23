import { describe, it, expect, beforeEach } from 'vitest'
import Text from './text.ts'

describe('Text', () => {
  let text

  beforeEach(() => {
    text = new Text()
  })

  it('deve ter align padrão "left"', () => {
    expect(text.align).toBe('left')
  })

  it('deve ter color padrão "primary"', () => {
    expect(text.color).toBe('primary')
  })

  it('deve ter onBrand padrão false', () => {
    expect(text.onBrand).toBe(false)
  })

  it('deve ter size padrão "md"', () => {
    expect(text.size).toBe('md')
  })

  it('deve ter wrap padrão "wrap"', () => {
    expect(text.wrap).toBe('wrap')
  })

  it('deve ter weight padrão "medium"', () => {
    expect(text.weight).toBe('medium')
  })

  it('atualiza align corretamente', () => {
    text.align = 'center'
    expect(text.align).toBe('center')
  })

  it('atualiza color corretamente', () => {
    text.color = 'secondary'
    expect(text.color).toBe('secondary')
  })

  it('altera onBrand de false para true e vice-versa', () => {
    text.onBrand = true
    expect(text.onBrand).toBe(true)
    text.onBrand = false
    expect(text.onBrand).toBe(false)
  })

  it('atualiza size corretamente', () => {
    text.size = 'xl'
    expect(text.size).toBe('xl')
  })

  it('atualiza wrap corretamente', () => {
    text.wrap = 'no-wrap'
    expect(text.wrap).toBe('no-wrap')
  })

  it('atualiza weight corretamente', () => {
    text.weight = 'bold'
    expect(text.weight).toBe('bold')
  })
})
