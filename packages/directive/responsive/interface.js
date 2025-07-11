/**
 * @const {symbol} match
 *
 * @description
 * Um Symbol único usado como um identificador para o middleware 'around' e
 * para o nome de um método privado-like na classe `Responsive`.
 *
 * @description
 * No componente `x-responsive`, este Symbol conecta o decorator
 * `@around(match)` aplicado ao setter da propriedade `media` com o método
 * privado `[match]()`.
 *
 * O método `[match]()` contém a lógica principal do componente: ele avalia
 * a media query e aplica os atributos do `x-responsive` ao seu elemento
 * pai se a condição for atendida.
 *
 * @see Responsive.media
 * @see Responsive[match]
 */
export const match = Symbol("match");
