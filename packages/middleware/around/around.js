/**
 * Decorator que executa um hook **em torno** (around) do método original,
 * disparando-o de forma assíncrona logo após a execução.
 *
 * Esse decorator envolve o método/getter/setter original em um Proxy que:
 *   1. Invoca o método/getter/setter original com os argumentos fornecidos.
 *   2. Agende a chamada do hook definido pelo nome `method` no mesmo contexto,
 *      passando os mesmos argumentos, usando `setTimeout` (sem bloquear o fluxo síncrono).
 *   3. Retorna imediatamente o valor produzido pelo método original.
 *
 * @param {string} method Nome do método hook a ser chamado assim que o método/setter original for executado.
 * @returns {MethodDecorator|PropertyDecorator} Um decorator para ser aplicado sobre métodos ou setters de classes.
 *
 * @description
 * Use este decorator quando precisar disparar efeitos colaterais após a execução de um método
 * sem atrasar ou modificar seu valor de retorno.
 *
 * @example
 * import { around } from './around.js'
 *
 * class Exemplo {
 *   #valor = 0
 *
 *   @around('logAfter')
 *   somar(x) {
 *     this.#valor += x
 *     return this.#valor
 *   }
 *
 *   logAfter(delta) {
 *     console.log('Somou:', delta)
 *   }
 * }
 *
 * const e = new Exemplo()
 * console.log(e.somar(10)) // => 10
 * // logo em seguida (após o próximo tick): 'Somou: 10'
 */
export const around = (method) => (_target, _propertyKey, descriptor) => {
  const type = descriptor.set ? "set" : "value";

  descriptor[type] = new Proxy(descriptor[type], {
    apply(original, context, args) {
      setTimeout(() => context[method](...args));
      return original.apply(context, args);
    },
  });
};
