# Componente `x-footer`

`x-footer` é um componente de layout que representa a seção de rodapé de uma página ou de um contêiner de aplicação. Ele é projetado para conter ações principais, links ou informações de copyright.

## Instalação e Uso

Para usar o `x-footer` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

No arquivo principal do seu projeto (como `main.js` ou `app.js`), adicione as duas linhas de importação a seguir:

```javascript
// Esta linha importa e executa o código que registra todos os componentes
// do Design System, incluindo o <x-footer>.
import "@nodusjs/x";

// Esta linha carrega a folha de estilo global necessária para que
// todos os componentes sejam renderizados corretamente.
import "@nodusjs/x/dist/x.css";
```

Depois de fazer isso, você pode usar a tag `<x-footer>` diretamente no seu HTML.

## Propriedades (Atributos)

Você pode customizar o comportamento do `x-footer` através dos seguintes atributos:

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `hidden` | (booleano) | `false` | Esconde o componente da tela. |

## Slots

`x-footer` oferece dois slots para uma organização de conteúdo flexível:

1.  **Slot Padrão**: A área principal do rodapé. Ideal para conteúdo informativo, como textos de copyright ou links de navegação secundários.
2.  **Slot `action`**: Uma área designada para elementos de ação, como botões primários e secundários (ex: "Salvar", "Cancelar", "Voltar").

**Exemplo de Uso com Ambos os Slots:**

```html
<x-footer>
  <div slot="action">
    <x-button variant="outline">Cancelar</x-button>
    <x-button variant="solid">Salvar Alterações</x-button>
  </div>

  <span>© 2024 NodusJS. Todos os direitos reservados.</span>
</x-footer>
```

## Interação com Dataflow (Mixin `Echo`)

O `x-footer` vem com o mixin `Echo` integrado, permitindo que ele reaja a eventos do sistema. Isso é particularmente útil para controlar sua visibilidade.

### Reagindo a Eventos

Você pode usar o atributo `on` para exibir ou esconder o `x-footer` com base no estado da aplicação.

**Cenário**: O rodapé com as ações de um formulário só deve aparecer quando o usuário começar a preenchê-lo, o que dispara um evento `form-dirty`.

```html
<x-footer hidden on="*/form-dirty:setter/hidden|always=false">
  <div slot="action">
    <x-button>Salvar</x-button>
  </div>
</x-footer>
```

**Fluxo:**

1.  Inicialmente, o `x-footer` está escondido.
2.  O evento `form-dirty` ocorre.
3.  O spark `always=false` ignora o dado do evento e retorna `false`.
4.  O setter `hidden` do `x-footer` recebe `false`, tornando o rodapé visível.

## Mixins Adicionais

O `x-footer` é composto pelos seguintes mixins:

  - **`Echo`**: Integra o componente ao sistema de dataflow, permitindo que ele reaja a eventos.
  - **`Hidden`**: Gerencia o estado `hidden` e o atributo correspondente, controlando a visibilidade do componente.

Essa composição de mixins permite que o `x-footer` herde comportamentos complexos de forma limpa e reutilizável.
