
# Componente `x-modal`

`x-modal` é um componente de UI que exibe conteúdo em uma camada sobreposta à página (um "overlay"). Ele é projetado para focar a atenção do usuário em informações ou ações importantes, bloqueando a interação com o conteúdo principal.

## Instalação e Uso

Para usar o `x-modal` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

```javascript
// Esta linha importa e executa o código que registra todos os componentes
// do Design System, incluindo o <x-modal>.
import "@nodusjs/x";

// Esta linha carrega a folha de estilo global necessária para que
// todos os componentes sejam renderizados corretamente.
import "@nodusjs/x/dist/x.css";
```

## Propriedades (Atributos)

Você pode customizar o comportamento do `x-modal` através do seguinte atributo:

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `opened` | (booleano) | `false` | Controla o estado de visibilidade do modal. Se presente ou com valor "true", o modal é exibido. |

## Slots

`x-modal` usa um `<slot>` padrão para permitir a inserção de qualquer conteúdo customizado que deva aparecer dentro do corpo do modal.

**Exemplo de Conteúdo em um Modal:**

```html
<x-modal name="confirm-delete">
  <x-card spacing="4xl">
    <x-stack direction="column" align="center" gap="lg">
      <x-icon use="warning" size="xl"></x-icon>
      <h3>Você tem certeza?</h3>
      <p>Esta ação não pode ser desfeita.</p>
      <x-action>
        <x-button variant="outline">Cancelar</x-button>
        <x-button color="danger">Confirmar</x-button>
      </x-action>
    </x-stack>
  </x-card>
</x-modal>
```

## Métodos e Interações

O `x-modal` pode ser controlado programaticamente ou, de forma mais poderosa, através do sistema de dataflow.

  - **`show()`**: Método para abrir o modal.
  - **`hide()`**: Método para fechar o modal.

Por padrão, clicar na área de overlay (fora do conteúdo do modal) acionará o método `hide()`, fechando o modal.

## Interação com Dataflow (Mixin `Echo`)

A forma mais comum de controlar o `x-modal` é de forma declarativa, usando eventos. O modal ouve eventos para se abrir e se fechar.

**Cenário**: Um botão "Abrir Modal" deve exibir um modal de confirmação. Outro botão dentro do modal deve fechá-lo.

```html
<x-button name="open-modal-btn">Abrir Modal</x-button>

<x-modal name="my-modal" on="open-modal-btn/click:method/show close-modal-btn/click:method/hide">
  <x-card>
    <p>Este é o conteúdo do modal.</p>
    <x-action>
      <x-button name="close-modal-btn">Fechar</x-button>
    </x-action>
  </x-card>
</x-modal>
```

### Fluxo de Dados:

1.  O usuário clica no botão com `name="open-modal-btn"`.
2.  O `<x-modal>` ouve o evento `open-modal-btn/click` e aciona seu método `show()`, tornando-se visível.
3.  O usuário clica no botão com `name="close-modal-btn"` dentro do modal.
4.  O `<x-modal>` ouve o evento `close-modal-btn/click` e aciona seu método `hide()`, fechando-se.
