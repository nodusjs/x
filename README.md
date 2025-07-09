# @nodusjs/x

`@nodusjs/x` é uma biblioteca de Web Components baseada em um poderoso sistema de **dataflow**. Cada componente propaga dados automaticamente para os demais, permitindo criar fluxos de interface reativos e declarativos sem a necessidade de gerenciar estado como em frameworks tradicionais.

Com `@nodusjs/x`, você pode montar interfaces ricas e interativas sem escrever nenhuma linha de JavaScript: basta combinar os elementos e o fluxo cuidará das atualizações.

> ⚠️ **Este projeto ainda está em desenvolvimento ativo.** As APIs e os pacotes podem mudar.

## Princípios

  - **Zero-JS (Quando Possível):** Conecte a lógica da sua UI diretamente no HTML através do atributo `on`. Deixe que o dataflow gerencie as atualizações.
  - **Declarativo:** Descreva *o que* a interface deve fazer, não *como*. Esqueça a manipulação manual do DOM.
  - **Reativo por Natureza:** Os componentes reagem a eventos e mudanças de dados de forma automática, mantendo a UI sempre sincronizada com o estado da aplicação.
  - **Componível:** Construído sobre uma base de componentes atômicos e mixins reutilizáveis, permitindo a criação de interfaces complexas a partir de blocos de construção simples.

## Instalação

### 1\. Usando um Gerenciador de Pacotes

```bash
# npm
npm install @nodusjs/x

# yarn
yarn add @nodusjs/x

# bun
bun add @nodusjs/x
```

Depois de instalar, importe o pacote e o CSS no ponto de entrada da sua aplicação:

```javascript
// 1. Importa e registra todos os componentes do Design System.
import "@nodusjs/x";

// 2. Importa a folha de estilo global necessária.
import "@nodusjs/x/dist/x.css";
```

### 2\. Usando via CDN

Para prototipagem rápida em plataformas como CodePen e JSFiddle, você pode importar os módulos diretamente da CDN `esm.sh`:

```html
<script type="module">
  import "https://esm.sh/@nodusjs/x";
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nodusjs/x/dist/x.css">
```

## Exemplo Prático: Formulário de Login Declarativo

O exemplo abaixo demonstra como os componentes do `@nodusjs/x` se compõem para criar um formulário de login completo, com layout, campos e **mensagens de validação declarativas**, sem a necessidade de escrever uma única linha de JavaScript para controlar o estado.

```html
<x-form width="md">
  <template>
    <x-stack direction="column">

      <x-input name="name" width="fill" required>
        <x-label>Name</x-label>
        <x-validity state="valueMissing">Name is required</x-validity>
      </x-input>

      <x-input name="email" type="email" width="fill" required>
        <x-label>Email</x-label>
        <x-validity state="valueMissing">Email is required</x-validity>
        <x-validity state="typeMismatch">Email is not valid</x-validity>
      </x-input>

      <x-input name="password" type="password" width="fill" required>
        <x-label>Password</x-label>
        <x-validity state="valueMissing">Email is required</x-validity>
      </x-input>

      <x-button type="submit" width="fill">Save</x-button>

    </x-stack>
  </template>
</x-form>

<script>
  document
    .querySelector('x-form')
    .addEventListener('submit', (e) => alert(JSON.stringify(e.detail, null, 4)));
</script>
```

Neste exemplo, a lógica de validação e a exibição de mensagens de erro são totalmente gerenciadas pelos próprios componentes, demonstrando o poder de uma arquitetura declarativa e componível.

## Scripts

  - `bun dev` inicia o servidor de desenvolvimento
  - `bun run build` gera os arquivos de distribuição
  - `bun run test` executa a suíte de testes

## Contribuindo

Contribuições são bem-vindas\! Abra issues, envie pull requests e participe do desenvolvimento do projeto.

## Licença

Distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.
