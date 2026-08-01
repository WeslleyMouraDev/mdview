# MDView — Mermaid Diagram Support Spec

> Suporte nativo a renderização de diagramas Mermaid em blocos de código markdown.

## Contexto

Adição de suporte para renderização automática de diagramas vetoriais SVG a partir de blocos ```` ```mermaid ```` no Markdown.

---

## Arquitetura & Componentes

### Componentes Novos / Modificados

- `src/components/MainContent/Mermaid.js` [NOVO] — Componente React para renderizar diagramas Mermaid em SVG com sincronização de temas (light/dark/contrast) e fallback para erros de sintaxe.
- `src/components/MainContent/Mermaid.module.css` [NOVO] — Estilos de centralização, fundo transparente e rolagem horizontal responsiva.
- `src/components/MainContent/MarkdownViewer.js` [MODIFICAR] — Interceptador de blocos de código com linguagem `mermaid` para renderizar o componente `Mermaid`.

---

## Dependências

- `mermaid` — Pacote NPM oficial para renderização de diagramas no navegador.

---

## Fluxo de Renderização

1. `react-markdown` processa o conteúdo do arquivo `.md`.
2. Quando encontra um bloco de código com `className="language-mermaid"`, chama o componente `<Mermaid chart={code} />`.
3. O componente `<Mermaid />` lê o atributo `data-theme` e `data-contrast` no `document.documentElement`.
4. Inicializa o `mermaid` com o tema apropriado (`dark` no dark mode, `neutral` no light mode).
5. Renderiza a string SVG dinamicamente e injeta no DOM de forma segura.
6. Ao alterar tema/contraste, re-renderiza o diagrama atualizado.
