# Componente `x-responsive`

`x-responsive` é um componente "headless" (sem interface visual) que aplica um conjunto de atributos a um elemento pai somente quando uma determinada condição de media query de CSS é atendida.

## Instalação e Uso

Para usar o `x-responsive` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

```javascript
// Registra todos os componentes, incluindo o <x-responsive>.
import "@nodusjs/x";

// Carrega a folha de estilo global.
import "@nodusjs/x/dist/x.css";
```

## Responsabilidade

A principal responsabilidade do `x-responsive` é desacoplar a lógica responsiva da implementação de um componente. Em vez de escrever media queries complexas dentro do CSS de cada componente, você pode usar o `x-responsive` para "ativar" ou "desativar" atributos em seu pai com base no tamanho da tela.

Ele funciona da seguinte maneira:

1.  Você o coloca como filho do elemento que deseja modificar responsivamente.
2.  Você define a condição no atributo `media` (ex: `media="(min-width: 768px)"`).
3.  Você adiciona os atributos que devem ser aplicados ao pai diretamente no `<x-responsive>`.
4.  Quando a janela do navegador é redimensionada e a condição do `media` se torna verdadeira, o `<x-responsive>` copia seus atributos para o elemento pai.

## Propriedades (Atributos)

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `media` | (string) | `""` | A media query de CSS a ser avaliada (ex: `"(max-width: 600px)"`). |
| `...` | `qualquer` | `N/A` | Quaisquer outros atributos no `<x-responsive>` serão passados para o elemento pai quando a media query for atendida. |

## Exemplo de Uso

O `x-responsive` é perfeito para alterar layouts ou propriedades de componentes em diferentes tamanhos de tela.

**Cenário**: Um layout de `<x-stack>` que é uma coluna (`direction="column"`) em telas pequenas, mas deve se tornar uma linha (`direction="row"`) em telas maiores que 768px.

```html
<x-stack direction="column" gap="lg">

  <x-responsive media="(min-width: 768px)" direction="row"></x-responsive>

  <x-card>Item 1</x-card>
  <x-card>Item 2</x-card>
  <x-card>Item 3</x-card>

</x-stack>
```

Neste exemplo, você pode ter múltiplos componentes `<x-responsive>` dentro de um mesmo pai, cada um definindo um conjunto diferente de atributos para diferentes breakpoints, criando layouts complexos de forma declarativa e legível.

## Descrição Técnica

O `x-responsive` utiliza um decorator interno `@resize` para ouvir o evento de redimensionamento da janela do navegador. A cada redimensionamento, seu método `[match]()` é acionado. Este método usa a API `window.matchMedia()` para avaliar se a media query definida no atributo `media` é atualmente verdadeira.

Se a condição for atendida, ele itera sobre seus próprios atributos (filtrando atributos de controle como `media` e `class`) e os aplica diretamente ao seu `parentElement` usando `setAttribute`.
