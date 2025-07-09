/**
 * @const {symbol} abort
 *
 * @description
 * Um Symbol único usado como um identificador para o middleware 'before'.
 *
 * No componente `x-fetch`, este Symbol atua como a "chave" que conecta
 * o decorator `@before(abort)` com o método privado `[abort]()`.
 *
 * O método `[abort]()` é responsável por cancelar qualquer requisição fetch
 * anterior que ainda esteja em andamento, prevenindo "race conditions".
 *
 * @see Fetch[abort]
 * @see Fetch.get
 * @see Fetch.post
 */
export const abort = Symbol("abort");

/**
 * @const {symbol} dispatch
 *
 * @description
 * Um Symbol único usado como um identificador para o middleware 'after'.
 *
 * No componente `x-fetch`, este Symbol conecta o decorator `@after(dispatch)`
 * com o método privado `[dispatch]()`.
 *
 * O método `[dispatch]()` é responsável por pegar a resposta final da
 * requisição fetch e despachar um evento de sucesso (`ok`) ou erro (`error`)
 * no barramento de eventos do Echo.
 *
 * @see Fetch[dispatch]
 * @see Fetch.get
 * @see Fetch.post
 */
export const dispatch = Symbol("dispatch");
