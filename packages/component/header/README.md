# Componente `x-header`

`x-header` é um componente de layout que representa a seção de cabeçalho de uma página ou de um contêiner de aplicação. Ele é projetado para conter elementos de identidade visual (como logotipos), títulos e ações primárias.

## Instalação e Uso

Para usar o `x-header` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

No arquivo principal do seu projeto (como `main.js` ou `app.js`), adicione as duas linhas de importação a seguir:

```javascript
// Esta linha importa e executa o código que registra todos os componentes
// do Design System, incluindo o <x-header>.
import "@nodusjs/x";

// Esta linha carrega a folha de estilo global necessária para que
// todos os componentes sejam renderizados corretamente.
import "@nodusjs/x/dist/x.css";
```

Depois de fazer isso, você pode usar a tag `<x-header>` diretamente no seu HTML.

## Propriedades (Atributos)

Você pode customizar o comportamento do `x-header` através dos seguintes atributos:

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `hidden` | (booleano) | `false` | Esconde o componente da tela. |

## Slots

`x-header` oferece dois slots para uma organização de conteúdo flexível e semântica:

1.  **Slot Padrão**: A área principal do cabeçalho, posicionada à esquerda. Ideal para o logotipo da aplicação ou o título da página atual.
2.  **Slot `action`**: Uma área posicionada à direita, designada para elementos de ação como botões de login, menu do usuário ou navegação principal.

**Exemplo de Uso com Ambos os Slots:**

```html
<x-header>
  <img src="/logo.svg" alt="Logo da Empresa">

  <div slot="action">
    <x-button variant="ghost">Sobre</x-button>
    <x-button variant="solid">Entrar</x-button>
  </div>
</x-header>
```

## Interação com Dataflow (Mixin `Echo`)

O `x-header` vem com o mixin `Echo` integrado, permitindo que ele reaja a eventos do sistema. Isso é particularmente útil para controlar sua visibilidade ou alterar seu conteúdo dinamicamente.

### Reagindo a Eventos

Você pode usar o atributo `on` para, por exemplo, esconder o cabeçalho em páginas de foco total, como um processo de checkout.

**Cenário**: O cabeçalho deve ser escondido quando um evento `enter-focus-mode` for disparado.

```html
<x-header on="*/enter-focus-mode:setter/hidden|always=true">
  </x-header>
```

**Fluxo:**

1.  Inicialmente, o `x-header` está visível.
2.  O evento `enter-focus-mode` ocorre.
3.  O spark `always=true` ignora o dado do evento e retorna `true`.
4.  O setter `hidden` do `x-header` recebe `true`, escondendo o cabeçalho.

## Mixins Adicionais

O `x-header` é composto pelos seguintes mixins, que lhe conferem comportamentos reutilizáveis:

  - **`Echo`**: Integra o componente ao sistema de dataflow, permitindo que ele reaja a eventos.
  - **`Hidden`**: Gerencia o estado `hidden` e o atributo correspondente, controlando a visibilidade do componente.
