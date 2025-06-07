# @nodus/x

@nodus/x é uma biblioteca de componentes web baseada em **dataflow**. Cada componente propaga dados automaticamente para os demais, permitindo criar fluxos declarativos sem a necessidade de gerenciar estado como fazemos em React, Vue ou Angular. Você pode montar interfaces completas sem escrever nenhuma linha de JavaScript: basta combinar os elementos do Nodus e o fluxo cuidará das atualizações.

> ⚠️  Este projeto ainda está em desenvolvimento ativo e as APIs podem mudar.

## Instalação

### npm ou bun

```bash
npm install @nodusjs/x
# ou
yarn add @nodusjs/x
# ou
bun add @nodusjs/x
```

Depois de instalar, importe o pacote principal para registrar os componentes:

```javascript
import "@nodusjs/x";
```

Se preferir, carregue o CSS da própria biblioteca:

```javascript
import "@nodusjs/x/dist/x.css";
```

### Uso via CDN

Para testar ou prototipar rapidamente, utilize os arquivos hospedados em uma CDN:

```txt
https://www.jsdelivr.com/package/npm/@nodusjs/x
```

## Scripts

- `npm run dev` inicia o servidor de desenvolvimento
- `npm run build` gera os arquivos de distribuição
- `npm test` executa a suíte de testes

## Contribuindo

Contribuições são bem-vindas! Abra issues, envie pull requests e participe do desenvolvimento do projeto.

## Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
