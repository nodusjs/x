import { describe, it, expect, beforeEach } from 'vitest'
import Heading from './heading.ts'

describe('Heading', () => {
  let heading

  beforeEach(() => {
    heading = new Heading()
  })

  it('deve ter align padrão "left"', () => {
    expect(heading.align).toBe('left')
  })

  it('deve ter color padrão "primary"', () => {
    expect(heading.color).toBe('primary')
  })

  it('deve ter onBrand padrão false', () => {
    expect(heading.onBrand).toBe(false)
  })

  it('deve ter size padrão "md"', () => {
    expect(heading.size).toBe('md')
  })

  it('deve ter wrap padrão "wrap"', () => {
    expect(heading.wrap).toBe('wrap')
  })

  it('deve ter weight padrão "medium"', () => {
    expect(heading.weight).toBe('medium')
  })

  it('atualiza align corretamente', () => {
    heading.align = 'center'
    expect(heading.align).toBe('center')
  })

  it('atualiza color corretamente', () => {
    heading.color = 'secondary'
    expect(heading.color).toBe('secondary')
  })

  it('altera onBrand de false para true e vice-versa', () => {
    heading.onBrand = true
    expect(heading.onBrand).toBe(true)
    heading.onBrand = false
    expect(heading.onBrand).toBe(false)
  })

  it('atualiza size corretamente', () => {
    heading.size = 'xl'
    expect(heading.size).toBe('xl')
  })

  it('atualiza wrap corretamente', () => {
    heading.wrap = 'no-wrap'
    expect(heading.wrap).toBe('no-wrap')
  })

  it('atualiza weight corretamente', () => {
    heading.weight = 'bold'
    expect(heading.weight).toBe('bold')
  })
})
