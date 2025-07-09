/**
 * @const {symbol} dispatch
 *
 * @description
 * Um Symbol único usado como um identificador para o middleware 'around'.
 *
 * No componente `x-like`, este Symbol conecta o decorator
 * `@around(dispatch)` aplicado ao setter da propriedade `value` com o método
 * privado `[dispatch]()`.
 *
 * O método `[dispatch]()` contém a lógica principal do componente: ele
 * filtra os itens no `dataset` pai com base no termo de busca e, em
 * seguida, dispara o evento `like` com os resultados encontrados.
 *
 * @see Like.value
 * @see Like[dispatch]
 */
export const dispatch = Symbol("dispatch");
