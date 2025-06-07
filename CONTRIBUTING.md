# Guia de Contribuição para **@nodusjs/x**

Obrigado por seu interesse em contribuir para o **@nodusjs/x**! Sua ajuda é fundamental para aprimorar esta biblioteca e torná-la cada vez mais útil para a comunidade de desenvolvedores. Aqui está um passo a passo para orientar sua contribuição.

## Formas de Contribuir

- **Reportar Bugs**: Se encontrar um comportamento inesperado ou falha, abra uma issue detalhando o problema.
- **Sugerir Melhorias**: Tem ideias de novas funcionalidades ou ajustes? Abra uma issue descrevendo sua proposta.
- **Enviar Pull Requests**: Caso já tenha uma correção ou melhoria pronta, envie um pull request seguindo as orientações abaixo.

---

## Passo a Passo

### 1. Faça um Fork do Repositório

Clique em “Fork” no canto superior direito do repositório **@nodusjs/x** para criar sua própria cópia.

### 2. Clone para sua Máquina

```bash
git clone https://github.com/seu-usuario/x.git
cd x
````

### 3. Instale as Dependências

```bash
bun install
```

### 4. Crie uma Branch de Trabalho

```bash
git checkout -b minha-nova-feature
```

Escolha um nome claro e descritivo para sua branch.

### 5. Implemente suas Alterações

* Siga as convenções de código do projeto.
* Atualize ou adicione testes sempre que necessário.
* Mantenha o código e docblocks (JSDoc) consistentes.

### 6. Execute os Testes Locais

```bash
bun run test
```

Verifique se todos os testes passam após suas alterações.

### 7. Faça o Commit e o Push

```bash
git add .
git commit -m "Descrição clara do que foi alterado"
git push origin minha-nova-feature
```

### 8. Abra um Pull Request

Vá ao repositório original e abra um PR de `minha-nova-feature` para `main`. Descreva:

* O que você implementou ou corrigiu.
* Por que a mudança é necessária.
* Como testar manualmente (se aplicável).

---

## Diretrizes de Qualidade

### Formatação e Estilo

* Use **Biome** para formatação automática.
* Siga as regras de lint definidas no projeto.
* Prefira aspas duplas (`"`) e sempre encerre linhas com ponto‐e‐vírgula.

### Documentação

* Atualize JSDoc em funções, classes e componentes novas ou modificadas.
* Inclua exemplos de uso práticos quando fizer sentido.

### Testes

* Cobertura deve incluir casos de uso e cenários de erro.
* Adicione testes unitários em **`*.spec.ts`** ao implementar novas features.
* Garanta que todos os testes existentes continuem passando.

---

## Comunicação e Suporte

* Em caso de dúvidas ou discussões, abra uma issue antes de começar a codificar.
* Seja claro e cordial em todas as interações.

## Código de Conduta

Ao contribuir para **@nodusjs/x**, você concorda em seguir nosso [Código de Conduta](https://github.com/nodusjs/x/blob/main/CODE_OF_CONDUCT.md) e manter um ambiente inclusivo.
