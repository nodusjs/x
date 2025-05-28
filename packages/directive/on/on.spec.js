import { describe, it, expect, beforeEach, vi } from 'vitest'
import On from './on'
import { connectArc, disconnectArc } from './interface'
import { hideble } from '@interface'

describe('⟨x-on⟩ directive (unit)', () => {
  let host;
  let parent;
  let whenSpy;

  beforeEach(() => {
    whenSpy = vi
      .spyOn(customElements, 'whenDefined')
      .mockResolvedValue(undefined)

    parent = {
      localName: 'x-button',
      [disconnectArc]: vi.fn(),
      [connectArc]: vi.fn()
    }

    host = new On()

    Object.defineProperty(host, 'parentElement', {
      value: parent,
      writable: true,
      configurable: true
    })
  })

  it('setter .value() deve chamar whenDefined → disconnectArc(antes) → connectArc(novo)', async () => {
    host.value = 'foo';

    expect(whenSpy).toHaveBeenCalledWith('x-button');

    await Promise.resolve();

    expect(parent[disconnectArc]).toHaveBeenCalledWith(undefined);
    expect(parent[connectArc]).toHaveBeenCalledWith('foo');
  })

  it('setter .value() subsequente: desconecta valor antigo e conecta valor novo', async () => {
    host.value = 'first';

    await Promise.resolve();

    parent[disconnectArc].mockClear();
    parent[connectArc].mockClear();

    host.value = 'second';

    await Promise.resolve();

    expect(parent[disconnectArc]).toHaveBeenCalledWith('first');
    expect(parent[connectArc]).toHaveBeenCalledWith('second');
  })

  it('também funciona definindo o atributo `value`', async () => {
    host.setAttribute('value', 'bar');
    await Promise.resolve();
    expect(parent[connectArc]).toHaveBeenCalledWith('bar');
  })

  it('método hideble (executado no @connected) deve setar display:none', () => {
    const spy = vi.spyOn(host.style, 'setProperty');
    host[hideble]();
    expect(spy).toHaveBeenCalledWith('display', 'none');
  })
})
