/**
 * @const {symbol} emitter
 *
 * @description
 * Um Symbol único usado como um identificador para o middleware 'around'.
 *
 * No componente `x-button`, este Symbol atua como a "chave" que conecta
 * o decorator `@around(emitter)` aplicado ao método `click` com o método
 * `[emitter]()`. O método `[emitter]` contém a lógica de interação com o
 * formulário (como `submit` ou `reset`).
 *
 * O uso de um Symbol em vez de uma string previne colisões de nomes de
 * propriedades e cria um contrato "privado" e bem definido para o middleware.
 *
 * @see Button.click
 * @see Button[emitter]
 */
export const emitter = Symbol("emitter");
