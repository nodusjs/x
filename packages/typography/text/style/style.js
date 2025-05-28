import { css } from "@nodusjs/std/dom";

/**
 * Gera o CSS para o componente `<x-text>` com base em suas propriedades.
 *
 * @function style
 * @param {Object} text Instância do componente `Text` contendo as propriedades:
 * @param {string} text.as       Tag HTML a ser estilizada (ex.: "p", "span").
 * @param {string} text.color    Token de cor do texto (ex.: "primary", "error-primary").
 * @param {boolean} text.onBrand Indica se deve usar o sufixo `_on-brand` no token de cor.
 * @param {string} text.size     Tamanho tipográfico (ex.: "sm", "md", "lg").
 * @param {string} text.weight   Peso da fonte (ex.: "regular", "bold").
 * @param {string} text.align    Alinhamento do texto (ex.: "left", "center").
 * @param {string} text.wrap     Política de quebra de linha ("wrap" ou "no-wrap").
 * @returns {CSSStyleSheet} Folha de estilo gerada, pronta para ser aplicada via `paint`.
 *
 * @description
 * Esta função monta dinamicamente regras de estilo usando tokens do design system
 * e as propriedades do componente `text` (tag, cor, tamanho, peso, alinhamento,
 * quebra de linha). O bloco `:host { ${text.as} { … } }` garante que o elemento
 * interno seja estilizado corretamente dentro do Shadow DOM.
 *
 * @example
 * ```js
 * import Text from "./text.js";
 * import { style } from "./style.js";
 *
 * const txt = new Text();
 * txt.as = "span";
 * txt.color = "error-primary";
 * txt.onBrand = true;
 * txt.size = "lg";
 * txt.weight = "semibold";
 * txt.align = "center";
 * txt.wrap = "no-wrap";
 *
 * const sheet = style(txt);
 * // sheet.cssRules[0].cssText será algo como:
 * // ":host { span { color: var(--text-error-primary_on-brand); display: inline-flex; ... } }"
 */
export const style = (text) =>
  css`
    :host {
      ${text.as} {
        color: var(--text-${text.color}${text.onBrand ? "_on-brand" : ""});
        display: inline-flex;
        font-family: var(--font-family-base);
        font-size: var(--font-size-text-${text.size});
        font-weight: var(--font-weight-${text.weight});
        line-height: var(--line-height-text-${text.size});
        text-align: ${text.align};
        text-wrap: ${text.wrap};
        transition: all 0.2s ease-out;
        width: var(--paragraph-max-width);
      }
    }
  `;
