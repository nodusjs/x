/**
 * Decorator que executa um hook **após** a execução do método original ou setter.
 *
 * Esse decorator envolve o método/getter/setter original em um Proxy que:
 *   1. Invoca o método/getter/setter original com os argumentos fornecidos.
 *   2. Após sua conclusão, chama o hook definido pelo nome `method` no mesmo contexto,
 *      passando como argumento o valor retornado pela chamada original.
 *   3. Retorna o valor produzido pelo hook.
 *
 * @param {string} method Nome do método hook a ser chamado depois da execução do método/setter original.
 * @returns {MethodDecorator|PropertyDecorator} Um decorator para ser aplicado sobre métodos ou setters de classes.
 *
 * @description
 * Esse decorator substitui o método/getter/setter original por um Proxy que permite
 * executar lógica adicional *após* o comportamento principal, sem alterar a assinatura
 * original do método ou setter.
 *
 * @example
 * import { after } from './after.js'
 *
 * class Calculadora {
 *   #valor = 0
 *
 *   @after('registrar')
 *   somar(x) {
 *     this.#valor += x
 *     return this.#valor
 *   }
 *
 *   registrar(resultado) {
 *     console.log('Resultado final:', resultado)
 *     // pode retornar outro valor se quiser sobrescrever
 *     return resultado
 *   }
 * }
 *
 * const c = new Calculadora()
 * c.somar(7)
 * // console.log: 'Resultado final: 7'
 */
export const after = (method) => (_target, _propertyKey, descriptor) => {
  const type = descriptor.set ? "set" : "value";

  descriptor[type] = new Proxy(descriptor[type], {
    apply(original, context, args) {
      return context[method](original.apply(context, args));
    },
  });
};
