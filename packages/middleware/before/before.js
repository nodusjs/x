/**
 * Decorator que executa um hook **antes** da execução do método original ou setter.
 *
 * Esse decorator envolve o método/getter/setter original em um Proxy que:
 *   1. Primeiro invoca o hook definido pelo nome `method` no mesmo contexto,
 *      passando todos os argumentos originais.
 *   2. Em seguida, executa o método/getter/setter original com os mesmos argumentos.
 *   3. Retorna o valor produzido pelo método/getter/setter original.
 *
 * @param {string} method Nome do método hook a ser chamado antes da execução do método/setter original.
 * @returns {MethodDecorator|PropertyDecorator} Um decorator para ser aplicado sobre métodos ou setters de classes.
 *
 * @description
 * Esse decorator não altera a assinatura do método original, apenas garante
 * que um callback (hook) seja executado antes da lógica principal daquele método
 * ou setter.
 *
 * @example
 * import { before } from './before.js'
 *
 * class Contador {
 *   #value = 0
 *
 *   @before('logArgs')
 *   incrementar(delta) {
 *     this.#value += delta
 *     return this.#value
 *   }
 *
 *   logArgs(delta) {
 *     console.log('Incrementando por:', delta)
 *     // não altera o retorno do método original
 *   }
 * }
 *
 * const c = new Contador()
 * console.log(c.incrementar(5))
 * // console.log: 'Incrementando por: 5'
 * // retorna 5
 */
export const before = (method) => (_target, _propertyKey, descriptor) => {
  const type = descriptor.set ? "set" : "value";

  descriptor[type] = new Proxy(descriptor[type], {
    apply(original, context, args) {
      return original.call(context, context[method](...args));
    },
  });
};
