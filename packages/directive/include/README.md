# Componente `x-include`

`x-include` é um componente de utilidade que permite incluir e renderizar conteúdo de arquivos HTML externos de forma declarativa. Ele funciona de maneira similar a um "Server-Side Include" (SSI) ou `<iframe>`, mas diretamente no DOM, com performance e flexibilidade.

## Instalação e Uso

Para usar o `x-include` e outros componentes do Design System, você precisa instalar o pacote e depois importar o JavaScript e o CSS no ponto de entrada da sua aplicação.

**1. Instale o pacote via npm/yarn/bun:**

```bash
npm install @nodusjs/x
```

**2. Importe os arquivos no seu projeto:**

```javascript
// Registra todos os componentes, incluindo o <x-include>.
import "@nodusjs/x";

// Carrega a folha de estilo global.
import "@nodusjs/x/dist/x.css";
```

## Responsabilidade

A principal responsabilidade do `x-include` é buscar o conteúdo de um arquivo HTML especificado no seu atributo `src` e renderizá-lo em seu lugar.

Seu grande diferencial é a **memoização**: uma vez que uma URL é buscada, seu conteúdo é armazenado em cache na memória. Requisições futuras para a mesma URL usarão a versão em cache em vez de fazer uma nova chamada de rede, tornando a navegação e a renderização de conteúdo repetido extremamente rápidas.

## Propriedades (Atributos)

| Atributo | Valores Possíveis | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `src` | (string) | `""` | A URL do arquivo HTML a ser incluído. |

## Casos de Uso

### 1\. Reutilização de Partes da Página

O uso mais simples é para componentes de página que se repetem, como cabeçalhos e rodapés, sem a necessidade de criar um Web Component completo para cada um.

```html
<body>
  <x-include src="/partials/header.html"></x-include>

  <main>
    <h1>Página Principal</h1>
  </main>

  <x-include src="/partials/footer.html"></x-include>
</body>
```

### 2\. Roteamento no Lado do Cliente (Client-Side Routing)

O `x-include` é a peça fundamental para criar um sistema de roteamento declarativo no `@nodusjs/x`. Ele pode conter elementos `<x-route>` que definem qual HTML carregar com base na URL atual da página.

**Cenário**: Um site com três páginas (Home, Contato, Sobre) que são carregadas dinamicamente sem um recarregamento completo da página.

```html
<body>
  <x-include src="/header.html"></x-include>

  <x-include>
    <x-route path="/" src="/home.html"></x-route>
    <x-route path="/quero-adotar/:id" src="/contact.html"></x-route>
    <x-route path="/sobre" src="/about.html"></x-route>
  </x-include>

  <x-include src="/footer.html"></x-include>
  <script type="module" src="https://cdn.jsdelivr.net/npm/@nodusjs/x/dist/x.js"></script>
</body>
```

Neste exemplo, o `<x-include>` detecta a URL da página e ativa o `<x-route>` correspondente, buscando e renderizando o `src` daquele `route`. Isso permite a criação de Single-Page Applications (SPAs) de forma simples e declarativa.
