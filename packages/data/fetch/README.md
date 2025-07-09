# Componente `x-fetch`

`x-fetch` é um componente "headless" (sem interface visual) que serve como uma ponte declarativa entre sua aplicação e APIs externas. Ele permite realizar requisições HTTP (GET, POST, PUT, DELETE) em resposta a eventos do sistema.

## Instalação e Uso

Para usar o `x-fetch` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

```javascript
// Registra todos os componentes, incluindo o <x-fetch>.
import "@nodusjs/x";

// Carrega a folha de estilo global.
import "@nodusjs/x/dist/x.css";
```

## Responsabilidade

A principal função do `x-fetch` é abstrair a lógica de requisições `fetch` do JavaScript para o HTML. Ele permite que você defina interações com APIs de forma declarativa.

1.  **Ouve Eventos:** Usa o atributo `on` para ser acionado por outros componentes (ex: um clique de botão ou um submit de formulário).
2.  **Executa Requisições:** Com base no evento recebido, ele executa um método HTTP (`get`, `post`, etc.) para a URL configurada.
3.  **Dispara Notificações:** Após a conclusão da requisição, ele dispara um de dois eventos:
      - `ok`: Se a requisição foi bem-sucedida, carregando os dados da resposta no `event.detail`.
      - `error`: Se a requisição falhou, carregando os detalhes do erro.
4.  **Habilita Reatividade:** Outros componentes, como um `<x-dataset>` ou `<x-render>`, podem ouvir os eventos `ok` ou `error` para reagir aos dados recebidos da API, criando um ciclo de dataflow completo.

## Propriedades (Atributos)

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `name` | (string) | `undefined` | O nome do `x-fetch`, usado para identificar seus eventos (ex: `myApi/ok`). |
| `url` | (string) | `""` | A URL do endpoint da API. Pode conter placeholders como `{id}` para interpolação. |
| `value` | (somente leitura) | `undefined` | Não utilizado ativamente, mas presente para consistência da API. |

## Métodos (API Pública)

Você pode interagir com o `x-fetch` através de seus métodos, que são acionados por eventos de outros componentes via `Echo`.

  - **`get(payload)`**: Executa uma requisição `GET`. O `payload` pode ser usado para interpolar a URL (ex: `url="/users/{id}"` e `payload={id: 1}`).
  - **`post(payload)`**: Executa uma requisição `POST`. O `payload` é usado tanto para o corpo (body) da requisição quanto para interpolar a URL.
  - **`put(payload)`**: Executa uma requisição `PUT`. Similar ao `post`.
  - **`delete(payload)`**: Executa uma requisição `DELETE`. Similar ao `get`.

## Exemplo de Uso Completo: Buscando e Exibindo Usuários

O exemplo abaixo demonstra como o `<x-fetch>` pode ser usado com um `<x-dataset>` e `<x-render>` para buscar dados de uma API e exibi-los na tela de forma totalmente declarativa.

```html
<x-button name="get-users">Buscar Usuários</x-button>


<x-fetch name="user-api" url="https://jsonplaceholder.typicode.com/users">
  <x-on value="get-users/click:method/get"></x-on>
</x-fetch>


<x-dataset name="users">
  <x-on value="user-api/ok:method/push"></x-on>
</x-dataset>


<x-render>
  <template>
    <ul>
      <li>{name} ({email})</li>
    </ul>
  </template>
  <x-on value="users/change:method/render"></x-on>
</x-render>
```

### Fluxo de Dados:

1.  O usuário clica no botão **Buscar Usuários**.
2.  O `<x-fetch>` ouve o evento `get-users/click` e executa uma requisição `GET` para a API de usuários.
3.  A API responde com sucesso. O `<x-fetch>` dispara um evento `user-api/ok` com o array de usuários no `detail`.
4.  O `<x-dataset>` ouve o evento `user-api/ok`, pega o array de usuários e o armazena em seu estado interno com o método `push`.
5.  Ao ter seus dados alterados, o `<x-dataset>` dispara um evento `users/change`.
6.  O `<x-render>` ouve o evento `users/change` e re-renderiza a lista, exibindo os nomes e emails dos usuários na tela.
