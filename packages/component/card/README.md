# Componente `x-card`

`x-card` é um componente de contêiner flexível, projetado para agrupar conteúdo e ações relacionadas em uma superfície visualmente distinta. Ele serve como um dos principais blocos de construção para layouts no Design System `@nodusjs/x`.

## Instalação e Uso

Para usar o `x-card` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

No arquivo principal do seu projeto (como `main.js` ou `app.js`), adicione as duas linhas de importação a seguir:

```javascript
// Esta linha importa e executa o código que registra todos os componentes
// do Design System, incluindo o <x-card>.
import "@nodusjs/x";

// Esta linha carrega a folha de estilo global necessária para que
// todos os componentes sejam renderizados corretamente.
import "@nodusjs/x/dist/x.css";
```

Depois de fazer isso, você pode usar a tag `<x-card>` diretamente no seu HTML.

## Propriedades (Atributos)

Você pode customizar a aparência e o comportamento do `x-card` através dos seguintes atributos:

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `spacing` | `'none'`, `'xxs'`, `'xs'`, ..., `'11xl'` | `'2xl'` | Define o espaçamento interno (padding) do card usando os tokens de espaçamento. |
| `width` | `'hug'`, `'fill'`, `[token]`, `[valor]` | `'hug'` | Controla a largura do card. |
| `height` | `'hug'`, `'fill'`, `[valor]` | `'hug'` | Controla a altura do card. |
| `hidden` | (booleano) | `false` | Esconde o componente da tela. |

### Detalhes do Atributo `width`

O atributo `width` é especialmente flexível:

  - **`hug`**: (Padrão) A largura se ajusta ao conteúdo.
  - **`fill`**: O card tenta preencher 100% do contêiner pai.
  - **Tokens de Largura**: Você pode usar tokens pré-definidos do Design System, como `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, etc.
  - **Valores CSS**: Você pode passar qualquer valor de largura CSS válido, como `300px` ou `75%`.

## Slots

`x-card` usa um `<slot>` padrão, o que o torna um contêiner versátil. Qualquer conteúdo que você colocar dentro das tags `<x-card>` será renderizado em seu interior.

**Exemplo com Título, Texto e um Botão:**

```html
<x-card spacing="4xl" width="sm">
  <h2>Bem-vindo ao Nodus!</h2>
  <p>Este é um exemplo de conteúdo dentro de um card, que pode incluir textos, imagens e outros componentes.</p>
  <x-button color="brand" variant="solid">Saiba Mais</x-button>
</x-card>
```

## Interação com Dataflow (Mixin `Echo`)

Assim como outros componentes do `@nodusjs/x`, o `x-card` vem com o mixin `Echo` integrado. Isso permite que ele reaja dinamicamente a eventos que ocorrem em outras partes da sua aplicação.

### Reagindo a Eventos

Você pode usar o atributo `on` para alterar as propriedades do card em resposta a eventos.

**Cenário**: Um painel de perfil (`x-card`) só deve ser exibido depois que o usuário fizer login. Um evento `user-logged-in` é disparado com `detail: true`.

```html
<x-card hidden on="*/user-logged-in:setter/hidden|not">
  <h3>Perfil do Usuário</h3>
  <p>Informações visíveis apenas para usuários logados.</p>
</x-card>
```

**Fluxo:**

1.  Inicialmente, o card está escondido.
2.  O evento `user-logged-in` ocorre com `detail: true`.
3.  O spark `not` transforma `true` em `false`.
4.  O setter `hidden` do `x-card` recebe `false`, tornando o card visível.

## Mixins Adicionais

O `x-card` é composto por vários mixins que lhe conferem comportamentos reutilizáveis:

  - **`Echo`**: Integra o componente ao sistema de dataflow.
  - **`Height`**: Gerencia a lógica do atributo `height`.
  - **`Hidden`**: Gerencia o estado `hidden` e o atributo correspondente.
  - **`Width`**: Gerencia a lógica do atributo `width`.

Essa abordagem de composição permite criar componentes robustos e consistentes, mantendo a complexidade de cada comportamento encapsulada em seu próprio mixin.
