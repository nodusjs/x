import { interpolate } from "@directive/render/interpolate";
import { after, before } from "@middleware";
import { Headless } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import Echo from "@nodusjs/std/echo";
import http from "./http";
import { abort, dispatch } from "./interface";

/**
 * @class Fetch
 *
 * @summary
 * Um componente "headless" para realizar requisições HTTP (fetch)
 * de forma declarativa e integrada ao sistema de dataflow do Echo.
 *
 * @description
 * O `x-fetch` atua como uma ponte entre a sua aplicação e APIs externas.
 * Ele não possui interface visual, mas ouve eventos de outros componentes
 * para acionar requisições GET, POST, PUT ou DELETE.
 *
 * Após cada requisição, ele dispara eventos de sucesso (`ok`) ou erro (`error`),
 * permitindo que outros componentes (como `x-dataset` ou `x-render`) reajam
 * aos dados recebidos de forma declarativa.
 *
 * @element x-fetch
 * @extends {Echo(Headless(HTMLElement))}
 */
@define("x-fetch")
class Fetch extends Echo(Headless(HTMLElement)) {
  #controller;
  #url;

  /**
   * Obtém a instância do `AbortController` atual, criando uma nova
   * se ela não existir. Essencial para gerenciar o ciclo de vida da requisição.
   * @returns {AbortController} O controlador da requisição.
   */
  get controller() {
    return (this.#controller ??= new AbortController());
  }

  /**
   * Obtém a URL base para as requisições.
   * @returns {string} A URL configurada.
   */
  get url() {
    return (this.#url ??= "");
  }

  /**
   * Define a URL base para as requisições.
   * @param {string} value - A URL da API (pode conter placeholders como {id}).
   */
  @attributeChanged("url")
  set url(value) {
    this.#url = value;
  }

  /**
   * @private
   * Aborta a requisição anterior (se houver) e cria um novo AbortController
   * para a próxima. Isso previne race conditions, garantindo que apenas a
   * resposta da última requisição seja processada.
   * @param {*} payload - O payload vindo do método original (é repassado sem modificação).
   * @returns {*} O payload original.
   */
  [abort](payload) {
    this.controller.abort();
    this.#controller = new AbortController();
    return payload;
  }

  /**
   * Executa uma requisição HTTP DELETE.
   * O middleware `@before(abort)` é executado primeiro, cancelando requisições pendentes.
   * O middleware `@after(dispatch)` é executado por último, despachando o resultado.
   * @param {*} payload - Os dados usados para interpolar a URL (ex: `{ id: 123 }`).
   * @returns {Promise<object>} A promessa da resposta da requisição.
   */
  @before(abort)
  @after(dispatch)
  delete(payload) {
    return http
      .delete(interpolate(this.url, payload))
      .signal(this.controller.signal)
      .json();
  }

  /**
   * @private
   * Processa a resposta final da requisição HTTP e dispara um evento
   * `ok` (sucesso) ou `error` (falha) no barramento do Echo.
   * @param {Promise<{data: any, error: any}>} response - A promessa contendo a resposta.
   * @returns {this} A própria instância.
   */
  [dispatch](response) {
    requestIdleCallback(async () => {
      const { data, error } = await response;
      error
        ? this.dispatchEvent(new CustomEvent("error", { detail: data }))
        : this.dispatchEvent(new CustomEvent("ok", { detail: data }));
    });
    return this;
  }

  /**
   * Executa uma requisição HTTP GET.
   * @param {*} payload - Dados para interpolar a URL.
   * @returns {Promise<object>} A promessa da resposta da requisição.
   */
  @before(abort)
  @after(dispatch)
  get(payload) {
    return http
      .get(interpolate(this.url, payload))
      .signal(this.controller.signal)
      .json();
  }

  /**
   * Executa uma requisição HTTP POST.
   * @param {*} payload - O corpo (body) da requisição e dados para interpolar a URL.
   * @returns {Promise<object>} A promessa da resposta da requisição.
   */
  @before(abort)
  @after(dispatch)
  post(payload) {
    return http
      .post(interpolate(this.url, payload))
      .body(payload)
      .signal(this.controller.signal)
      .json();
  }

  /**
   * Executa uma requisição HTTP PUT.
   * @param {*} payload - O corpo (body) da requisição e dados para interpolar a URL.
   * @returns {Promise<object>} A promessa da resposta da requisição.
   */
  @before(abort)
  @after(dispatch)
  put(payload) {
    return http
      .put(interpolate(this.url, payload))
      .body(payload)
      .signal(this.controller.signal)
      .json();
  }
}

export default Fetch;
