# Componente `x-button`

`x-button` é um componente de botão altamente customizável e acessível, construído com a biblioteca `@nodusjs/std`. Ele foi projetado para ser o bloco de construção fundamental para interações em qualquer aplicação, servindo como um pilar do Design System `@nodusjs/x`.

## Instalação e Uso

Para usar o `x-button` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

No arquivo principal do seu projeto (como `main.js` ou `app.js`), adicione as duas linhas de importação a seguir:

```javascript
// Esta linha importa e executa o código que registra todos os componentes
// do Design System, incluindo o <x-button>.
import "@nodusjs/x";

// Esta linha carrega a folha de estilo global necessária para que
// todos os componentes sejam renderizados corretamente.
import "@nodusjs/x/dist/x.css";
```

Depois de fazer isso, você pode usar a tag `<x-button>` diretamente no seu HTML.

## Propriedades (Atributos)

Você pode customizar a aparência e o comportamento do `x-button` através dos seguintes atributos:

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `color` | `'brand'`, `'error'` | `'brand'` | Define o tema de cor do botão. |
| `variant` | `'solid'`, `'outline'`, `'ghost'`, `'link'` | `'solid'` | Define a variante visual do botão. |
| `size` | `'sm'`, `'md'`, `'lg'`, `'xl'` | `'md'` | Define o tamanho do botão (altura, padding, etc.). |
| `type` | `'submit'`, `'reset'` | `'submit'` | Define a ação padrão do botão dentro de um formulário. |
| `only-icon`| (booleano) | `false` | Se presente, renderiza o botão como um círculo/quadrado, ideal para ícones. |
| `disabled`| (booleano) | `false` | Desabilita o botão, alterando sua aparência e prevenindo interações. |
| `hidden` | (booleano) | `false` | Esconde o componente da tela. |
| `width` | `'hug'`, `'fill'`, `[token]`, `[valor]` | `'hug'` | Controla a largura do botão. |
| `value` | `qualquer` | `undefined` | Um valor associado ao botão, útil em formulários. |

### Detalhes do Atributo `width`

O atributo `width` é especialmente flexível:

  - **`hug`**: (Padrão) A largura se ajusta ao conteúdo.
  - **`fill`**: O botão tenta preencher 100% do contêiner pai.
  - **Tokens de Largura**: Você pode usar tokens pré-definidos do Design System, como `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, etc.
    ```html
    <x-button width="lg">Botão Largo</x-button>
    ```
  - **Valores CSS**: Você pode passar qualquer valor de largura CSS válido, como `250px` ou `50%`.

## Slots

`x-button` usa um `slot` padrão para permitir a inserção de conteúdo customizado, como texto e ícones.

**Exemplo com Texto:**

```html
<x-button>Meu Texto Customizado</x-button>
```

**Exemplo com Ícone e Texto:**

```html
<x-button>
  <x-icon name="check"></x-icon>
  <span>Confirmar</span>
</x-button>
```

## Interação com Dataflow (Mixin `Echo`)

O `x-button` vem com o mixin `Echo` integrado, o que o torna um cidadão de primeira classe no sistema de dataflow do `@nodusjs/std`. Isso significa que ele pode tanto **disparar eventos** no barramento central quanto **reagir a eles**.

### Disparando Eventos

Por padrão, o `x-button` dispara um evento `click` customizado que pode ser ouvido por outros componentes.

### Reagindo a Eventos

Você pode usar o atributo `on` para fazer o `x-button` reagir a eventos de outros componentes.

**Cenário**: Desabilitar um botão de "Salvar" até que um formulário se torne válido. Um evento `form-validated` é disparado com `detail: true` quando o formulário está pronto.

```html
<x-button on="*/form-validated:setter/disabled|not">
  Salvar
</x-button>
```

**Fluxo:**

1.  O evento `form-validated` ocorre com `detail: true`.
2.  O spark `not` transforma `true` em `false`.
3.  O setter `disabled` do `x-button` recebe `false`, habilitando o botão.

## Mixins Adicionais

O `x-button` é composto por vários mixins que lhe conferem comportamentos reutilizáveis:

  - **`Disabled`**: Gerencia o estado `disabled` e o atributo correspondente.
  - **`Hidden`**: Gerencia o estado `hidden` e o atributo correspondente.
  - **`Width`**: Gerencia a lógica do atributo `width`.

Essa composição de mixins demonstra a filosofia do `@nodusjs/x` de construir componentes complexos a partir de blocos de comportamento lógicos, pequenos e reutilizáveis.
