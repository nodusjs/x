import { describe, it, expect, vi } from 'vitest'
import { stop } from './stop.js'

describe('spark stop', () => {
  it('deve chamar stopPropagation no evento e retornar o próprio evento', () => {
    const fakeEvent = { stopPropagation: vi.fn() }
    const returned = stop(fakeEvent)
    expect(fakeEvent.stopPropagation).toHaveBeenCalled()
    expect(returned).toBe(fakeEvent)
  })
})
