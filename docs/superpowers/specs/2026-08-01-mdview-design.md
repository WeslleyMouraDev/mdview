# MDView — Design Spec

> Visualizador de Markdown pessoal com deploy na Vercel.
> Recebe arquivos `.md` no navegador, lista à esquerda, renderiza formatado à direita.

## Contexto

Ferramenta de uso pessoal para visualizar arquivos Markdown de forma bonita e rápida.
Tudo roda no navegador (client-side), com persistência local via IndexedDB para
manter os arquivos entre sessões. Inclui exportação para PDF e HTML.

---

## Stack Técnica

| Camada         | Tecnologia                                    |
| -------------- | --------------------------------------------- |
| Framework      | Next.js 14+ (App Router)                      |
| Markdown       | react-markdown + remark-gfm                   |
| Syntax Highlight | rehype-highlight (highlight.js)              |
| Persistência   | Dexie.js (wrapper IndexedDB)                  |
| Estilização    | CSS Modules                                   |
| Tipografia     | Inter (UI) + JetBrains Mono (código)          |
| Deploy         | Vercel (static export ou SSG)                 |

---

## Arquitetura de Componentes

```
App (layout)
├── Sidebar (280px, colapsável em mobile)
│   ├── FileUploader (drag-and-drop zone + botão de seleção)
│   ├── FileList (lista de arquivos com ícones, nome, tamanho)
│   │   └── FileItem (item clicável, com botão de remover)
│   └── SidebarFooter (toggle dark/light mode)
├── MainContent (max-width: 780px, centralizado)
│   ├── EmptyState (quando nenhum arquivo está selecionado)
│   ├── MarkdownViewer (renderização formatada do .md selecionado)
│   │   └── TableOfContents (TOC gerada dos headings)
│   └── ExportBar (botões de exportar PDF / HTML)
```

---

## Fluxo de Dados

1. Usuário arrasta/seleciona arquivos `.md` → `FileUploader` lê via `FileReader API`
2. Conteúdo é salvo no IndexedDB via Dexie.js (`{ id, name, content, size, uploadedAt }`)
3. `FileList` reflete os arquivos persistidos
4. Ao clicar num arquivo, `MarkdownViewer` renderiza o conteúdo com react-markdown
5. Ao recarregar a página, os arquivos são restaurados do IndexedDB

---

## Design Visual

### Layout

- **Sidebar:** largura fixa 280px, fundo levemente acinzentado
- **MainContent:** restante da tela, conteúdo com `max-width: 780px` centralizado (estilo Notion/Medium)
- **Responsivo:** telas < 768px → sidebar vira drawer lateral com botão hamburger

### Paleta de Cores

| Token              | Light Mode   | Dark Mode    |
| ------------------ | ------------ | ------------ |
| Fundo principal    | `#FFFFFF`    | `#191919`    |
| Texto principal    | `#37352F`    | `#E8E5E0`    |
| Fundo sidebar      | `#F7F6F3`    | `#202020`    |
| Bordas             | `#E8E5E0`    | `#2F2F2F`    |
| Accent (seleção)   | `#2EAADC`    | `#529CCA`    |

- **Tema padrão:** Light mode
- **Toggle:** ícone sol/lua no footer da sidebar, transição suave de 200ms
- **Preferência:** salva no localStorage

### Tipografia

- **UI:** Google Font Inter (400, 500, 600)
- **Código:** JetBrains Mono ou Fira Code (monospace)
- **Headings:** peso 600, escala proporcional clara

### Micro-animações

- Hover na sidebar: escala sutil + sombra
- Troca de arquivo: fade de conteúdo (150ms)
- Drop zone ativa: borda tracejada pulsante

---

## Funcionalidades

### Upload de Arquivos

- Drag-and-drop sobre toda a janela (overlay com borda tracejada e ícone durante drag)
- Botão de seleção como alternativa
- Aceita múltiplos arquivos de uma vez
- Filtra apenas `.md` — toast discreto para outros tipos

### Lista de Arquivos (Sidebar)

- Cada item: ícone de documento, nome (truncado se longo), tamanho formatado
- Arquivo selecionado: barra lateral accent colorida
- Botão ✕ para remover (revelado no hover)
- Ordenação por nome ou data de upload
- Botão "Limpar todos" com confirmação modal

### Renderização Markdown

- Estilo Notion-like: headings claros, listas espaçadas, blockquotes com borda colorida
- Suporte GFM: tabelas, strikethrough, task lists
- Syntax highlighting em blocos de código
- Imagens inline e links clicáveis
- Table of Contents (TOC) gerada automaticamente dos headings

### Exportação

- **PDF:** via `window.print()` com `@media print` otimizado (esconde sidebar e export bar)
- **HTML:** gera arquivo `.html` standalone com CSS inline

---

## Persistência

- **Motor:** IndexedDB via Dexie.js
- **Schema:** `{ id: auto-increment, name: string, content: string, size: number, uploadedAt: Date }`
- **Limite:** alerta suave ao ultrapassar ~50MB de armazenamento total
- **Tema:** preferência salva no localStorage

---

## Tratamento de Erros

| Cenário                          | Comportamento                                                    |
| -------------------------------- | ---------------------------------------------------------------- |
| Arquivo não-.md arrastado        | Toast: "Apenas arquivos .md são aceitos"                         |
| Arquivo duplicado (mesmo nome)   | Pergunta: substituir ou renomear com sufixo `(2)`                |
| Arquivo vazio                    | Renderiza estado vazio: "Este arquivo está vazio"                |
| Falha ao ler arquivo             | Toast de erro com nome do arquivo                                |
| IndexedDB indisponível           | Funciona sem persistência + aviso sutil                          |

---

## Empty State

- Ícone grande de documento com seta de upload
- Texto: "Arraste seus arquivos .md aqui ou clique para selecionar"
- Funciona como drop zone e botão de upload ao mesmo tempo

---

## Acessibilidade

- Navegação por teclado na FileList (↑↓ navegar, Enter selecionar, Delete remover)
- Labels ARIA nos botões de ação
- Foco visível nos elementos interativos

---

## Fora de Escopo (v1)

- Edição de markdown (split view / editor)
- Autenticação ou contas de usuário
- Armazenamento server-side
- Compartilhamento de links
- Sistema de tabs/multi-panel
