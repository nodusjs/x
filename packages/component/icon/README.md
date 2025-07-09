# Componente `x-icon`

`x-icon` é um componente versátil para renderizar ícones SVG de forma consistente e acessível. Ele é projetado para trabalhar com fontes de ícones que usam **ligaduras tipográficas**, como a biblioteca [Material Symbols](https://fonts.google.com/icons) do Google.

## Instalação e Uso

Para usar o `x-icon` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

No arquivo principal do seu projeto, adicione as duas linhas de importação:

```javascript
// Registra todos os componentes do Design System, incluindo o <x-icon>.
import "@nodusjs/x";

// Carrega a folha de estilo global, que inclui a fonte 'Material Symbols Outlined'.
import "@nodusjs/x/dist/x.css";
```

## Propriedades (Atributos)

Você pode customizar o `x-icon` através dos seguintes atributos:

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `use` | (string) | `""` | O nome da **ligadura** do ícone a ser exibido. |
| `size` | `'sm'`, `'md'`, `'lg'`, `'xl'` | `'md'` | Define o tamanho do ícone. |
| `hidden` | (booleano) | `false` | Esconde o componente da tela. |

### O Atributo `use` e as Ligaduras

O atributo `use` é a propriedade mais importante deste componente. Ele não recebe um caminho para um arquivo, mas sim o **nome textual** do ícone da biblioteca Google Material Symbols.

A fonte de ícones é configurada para usar "ligaduras", um recurso tipográfico que substitui uma sequência de caracteres por um único glifo (o ícone).

**Como funciona:**

1.  Você fornece o nome do ícone no atributo `use`, por exemplo, `use="settings"`.
2.  O componente renderiza essa string.
3.  O navegador, ao aplicar a fonte `Material Symbols Outlined`, detecta a palavra "settings" e a substitui automaticamente pelo ícone de engrenagem.

**Como encontrar os nomes dos ícones?**
Você pode navegar por toda a biblioteca e encontrar os nomes exatos na página oficial [Google Fonts - Material Symbols](https://fonts.google.com/icons).

**Exemplos:**

```html
<x-icon use="favorite"></x-icon>

<x-icon use="account_circle"></x-icon>

<x-icon use="search" size="lg"></x-icon>
```

## Interação com Dataflow (Mixin `Echo`)

O `x-icon` vem com o mixin `Echo` integrado, permitindo que o ícone exibido seja alterado dinamicamente em resposta a eventos do sistema.

**Cenário**: Um botão de "play/pause" que altera seu ícone dependendo do estado do player de vídeo. O player dispara um evento `player-state-changed` com `detail: 'playing'` ou `detail: 'paused'`.

```html
<x-button on="*/player-state-changed:setter/use|prop=detail.icon">
  <x-icon id="player-icon" use="play_arrow"></x-icon>
</x-button>
```

Neste cenário, um componente de player de vídeo poderia disparar um evento como este para pausar:

```javascript
const event = new CustomEvent('player-state-changed', {
  detail: { icon: 'pause' }
});
document.dispatchEvent(event);
```

## Mixins Adicionais

O `x-icon` é composto pelos seguintes mixins, que lhe conferem comportamentos reutilizáveis:

  - **`Echo`**: Integra o componente ao sistema de dataflow.
  - **`Hidden`**: Gerencia o estado `hidden` e o atributo correspondente, controlando a visibilidade do componente.

Essa abordagem resulta em um componente de ícone que é ao mesmo tempo simples de usar e extremamente poderoso para criar interfaces dinâmicas.
