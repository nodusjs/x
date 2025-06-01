import { css } from "@nodusjs/std/dom";

/**
 * Define os estilos de exibição para o `<x-validity>`, incluindo cores,
 * tipografia e visibilidade condicional.
 *
 * @returns {CSSStyleSheet} Folha de estilo contendo regras para o host e para
 * o estado `invalid`.
 *
 * @description
 * Esta função retorna um template de CSS que esconde o elemento por padrão
 * e exibe-o apenas quando o estado de invalidade (`:host(:state(invalid))`)
 * estiver ativo. Também aplica variáveis de design system para cor, fonte,
 * peso e espaçamento, garantindo consistência visual.
 *
 * @example
 * import { style } from "./style.js";
 *
 * // Em um contexto de Shadow DOM:
 * const sheet = style();
 * shadowRoot.adoptedStyleSheets = [sheet];
 */
export const style = () => css`
  :host {
    color: var(--text-error-primary);
    display: none;
    font-family: var(--font-family-base);
    font-size: var(--font-size-text-sm);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-text-sm);
  }

  :host(:state(invalid)) {
    display: inline;
  }
`;
