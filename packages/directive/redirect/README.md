# Componente `x-redirect`

`x-redirect` é um componente "headless" (sem interface visual) que realiza um redirecionamento de URL no lado do cliente, utilizando a History API do navegador para criar transições de página sem recarregamento.

## Instalação e Uso

Para usar o `x-redirect` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

```javascript
// Registra todos os componentes, incluindo o <x-redirect>.
import "@nodusjs/x";

// Carrega a folha de estilo global.
import "@nodusjs/x/dist/x.css";
```

## Responsabilidade

A principal responsabilidade do `x-redirect` é alterar a URL da página de forma programática em resposta a um evento. Ele é uma peça fundamental para construir SPAs (Single-Page Applications) e fluxos de navegação complexos.

Ele funciona da seguinte maneira:

1.  **Ouve um Evento:** Usa o atributo `on` para ser acionado por um evento, como a submissão bem-sucedida de um formulário (`ok`).
2.  **Executa a Navegação:** Ao ser acionado, seu método `go()` utiliza `history.pushState()` para alterar a URL na barra de endereços do navegador para o valor definido no atributo `href`.
3.  **Aciona o Roteador:** A mudança na URL é então detectada por componentes de roteamento, como o `<x-include>` com `<x-route>`, que por sua vez renderizam a nova página correspondente.

## Propriedades (Atributos)

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `href` | (string) | `#` | A URL de destino para onde o redirecionamento deve ocorrer. |

## Exemplo de Uso

O `x-redirect` é frequentemente usado após uma ação do usuário ser concluída com sucesso, como o envio de um formulário, para navegar o usuário para uma nova página (por exemplo, uma página de "sucesso" ou de volta para a listagem).

**Cenário**: Após um usuário submeter um formulário de criação (`<x-form name="user">`), ele deve ser redirecionado para a página principal (`/`).

```html
<x-form name="user">
  <template>
    <x-button type="submit">Criar Usuário</x-button>
  </template>
</x-form>

<x-fetch name="create-user-api" url="/api/users" method="POST">
  <x-on value="user/submit:method/post"></x-on>
</x-fetch>

<x-redirect href="/" on="create-user-api/ok:method/go"></x-redirect>
```

### Fluxo de Dados:

1.  O usuário preenche e envia o `<x-form name="user">`.
2.  O `<x-fetch>` ouve o evento `user/submit` e envia os dados para a API com uma requisição `POST`.
3.  A API responde com sucesso, e o `<x-fetch>` dispara um evento `create-user-api/ok`.
4.  O `<x-redirect>` ouve o evento `ok`, aciona seu método `go()`, e altera a URL do navegador para `/`.
5.  Um componente de roteamento (como `<x-include>`) detecta a mudança de URL e renderiza a página inicial.
