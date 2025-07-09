/**
 * @const {symbol} dispatch
 *
 * @description
 * Um Symbol único usado como um identificador para o middleware 'around'.
 *
 * No componente `x-find`, este Symbol conecta o decorator
 * `@around(dispatch)` aplicado ao setter da propriedade `value` com o método
 * privado `[dispatch]()`.
 *
 * O método `[dispatch]()` contém a lógica principal do componente: ele busca
 * o item no `dataset` pai e, em seguida, dispara o evento `find` com o
 * resultado encontrado. O uso de um Symbol garante um contrato interno claro
 * e previne colisões de nomes.
 *
 * @see Find.value
 * @see Find[dispatch]
 */
export const dispatch = Symbol("dispatch");
