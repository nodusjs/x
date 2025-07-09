# Pacote `component`

O pacote `component` é o diretório central do Design System `@nodusjs/x`, onde todos os Web Components reutilizáveis são definidos. Cada subdiretório representa um componente individual e autocontido, como `button`, `card`, `icon`, etc.

## Responsabilidade

A principal responsabilidade deste pacote é fornecer uma coleção de **componentes de UI puros e prontos para uso**. Diferente de pacotes como `directive` ou `mixin` que fornecem *comportamentos* ou *lógicas*, o pacote `component` oferece elementos tangíveis e visuais que formam a base de qualquer aplicação.

Cada componente encapsula seu próprio:

  - **HTML (`component.js`):** A estrutura semântica do elemento.
  - **CSS (`style.js` e `token.js`):** A lógica de estilização e os Design Tokens que definem sua aparência.
  - **JavaScript (`index.js` ou `[nome].js`):** A lógica de negócios, reatividade e ciclo de vida, utilizando os utilitários do `@nodusjs/std`.

## Como Usar

A forma de uso é simplificada por este design. Para ter acesso a todos os componentes em seu projeto, basta uma única linha de importação, como definido no ponto de entrada principal da biblioteca `@nodusjs/x`:

```javascript
// Importa o pacote principal, que por sua vez importa o pacote 'component',
// registrando todos os elementos como <x-button>, <x-card>, etc.
import "@nodusjs/x";
```

Essa abordagem torna o uso do Design System simples e direto, embora também seja possível configurar o projeto para permitir a importação individual de componentes para otimização de performance.
