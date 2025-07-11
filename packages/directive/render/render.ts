import { Hidden, Template } from "@mixin";
import { attributeChanged, define } from "@nodusjs/std/directive";
import { paint, repaint, retouch } from "@nodusjs/std/dom";
import Echo from "@nodusjs/std/echo";
import { component } from "./component";
import { textContent } from "./interface";
import { interpolate } from "./interpolate";
import { style } from "./style";

/**
 * @class Render
 * @summary
 * Um componente declarativo para renderizar dinamicamente templates HTML
 * com base em um conjunto de dados.
 *
 * @description
 * O `x-render` atua como a "view" no dataflow do Nodus. Ele ouve eventos
 * (geralmente de um `x-dataset` ou `x-fetch`) e usa o payload desses eventos
 * para popular um template HTML.
 *
 * Ele é projetado para renderizar tanto um único item quanto uma lista de
 * itens. O template HTML é definido dentro do próprio `<x-render>` em uma
 * tag `<template>`, e o `x-render` itera sobre os dados recebidos,
 * substituindo placeholders (como `{name}`) pelos valores correspondentes.
 *
 * @element x-render
 * @extends {Echo(Hidden(Template(HTMLElement)))}
 *
 * @see {@link define} - Para o registro do custom element.
 * @see {@link paint} - Para a renderização inicial.
 * @see {@link repaint} - Para acionar a re-renderização quando o método `render` é chamado.
 * @see {Echo} - Para a integração com o sistema de dataflow.
 * @see {Template} - Mixin que fornece a capacidade de ler o conteúdo de uma tag `<template>`.
 */
@define("x-render")
@paint(component, style)
class Render extends Echo(Hidden(Template(HTMLElement))) {
  #textContent;
  #internals;
  #gap;

  /**
   * @private
   * Obtém o conteúdo HTML processado. Usado pela função `component` para
   * renderizar o resultado final.
   * @returns {string} O conteúdo HTML renderizado.
   */
  get [textContent]() {
    return (this.#textContent ??= "");
  }

  /**
   * Obtém a instância de `ElementInternals` do componente.
   * @returns {ElementInternals} A instância de `ElementInternals`.
   */
  get internals() {
    return (this.#internals ??= this.attachInternals());
  }

  /**
   * Obtém o token de espaçamento (gap) entre os itens renderizados.
   * @returns {string} O token de espaçamento. O padrão é '2xl'.
   */
  get gap() {
    return (this.#gap ??= "2xl");
  }

  /**
   * Define o token de espaçamento (gap) entre os itens renderizados.
   * Aciona um retoque (`@retouch`) para atualizar o estilo.
   * @param {('none'|'xxs'|'xs'|'sm'|'md'|'lg'|'xl'|...)} value - O novo token de espaçamento.
   */
  @attributeChanged("gap")
  @retouch
  set gap(value) {
    this.#gap = value;
  }

  /**
   * O construtor da classe Render.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  /**
   * O principal método de renderização. Ele recebe um conjunto de dados,
   * popula o template e aciona uma nova pintura do componente.
   *
   * @description
   * Este método pega o payload (um objeto ou um array de objetos), itera
   * sobre ele, e para cada item, interpola seus valores no template HTML
   * (lido do mixin `Template`). O resultado é uma única string de HTML
   * que é então renderizada na tela. O processo é otimizado com
   * `requestAnimationFrame` para evitar atualizações de layout desnecessárias.
   *
   * @param {object|object[]} payload - Os dados a serem renderizados.
   * @returns {this} A própria instância para encadeamento.
   */
  @repaint
  render(payload) {
    requestAnimationFrame(() => {
      this.#textContent = []
        .concat(payload)
        .map((data) => interpolate(super.template, data))
        .join("");
    });
    return this;
  }
}

export default Render;
