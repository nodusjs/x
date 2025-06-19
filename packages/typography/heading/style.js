import { css } from "@nodusjs/std/dom";

/**
 * Gera o CSS específico para o `<x-heading>`, sobrescrevendo os estilos
 * base do `<x-text>` para exibir tipografia de display.
 *
 * @param {Object} text                    Instância de `Heading` (extends Text).
 * @param {('xs'|'sm'|'md'|'lg'|'xl'|'2xl')} text.size   Tamanho tipográfico do heading.
 * @returns {CSSStyleSheet}                Folha de estilo contendo apenas as regras que ajustam font-size e line-height.
 *
 * @description
 * Esta função injeta dinamicamente as variáveis CSS de display baseadas nos
 * tokens `--font-size-display-{size}` e `--line-height-display-{size}`, permitindo
 * que o `<x-heading>` utilize níveis de título (h1, h2, etc.) com escala de
 * tipografia adequada.
 *
 * @example
 * import Heading from "./heading.js";
 * import { style as headingStyle } from "./style.js";
 *
 * const h = new Heading();
 * h.size = "lg";
 *
 * const sheet = headingStyle(h);
 * // sheet.cssRules[0].cssText será algo como:
 * // ":host { font-size: var(--font-size-display-lg); line-height: var(--line-height-display-lg); }"
 */
export const style = (heading) =>
  css`
    :host {
      ${heading.as} {
        font-size: var(--font-size-display-${heading.size});
        line-height: var(--line-height-display-${heading.size});
      }
    }
  `;
