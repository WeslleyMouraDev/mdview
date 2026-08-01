# MDView — Improvements Spec (v2)

> Visualizador de Markdown pessoal — Melhorias Mobile, Controles Flutuantes e Modo Contraste.

## Contexto

Adição de melhorias na experiência de leitura e uso mobile do MDView:
1. **Modo Contraste** (High Contrast Mode com paleta pastel e tons suaves para não cansar a vista).
2. **Controles Flutuantes** (Botão Voltar ao Topo + Botão de Índice Flutuante / Popover TOC).
3. **UX Mobile Otimizada** (Header fixo mobile, auto-close da sidebar ao selecionar arquivo, touch targets ampliados).

---

## Design Visual & Tokens de Cores

### Atributos HTML
- `data-theme`: `'light'` | `'dark'`
- `data-contrast`: `'normal'` | `'high'`

### Paleta de Cores — Modo Contraste (`data-contrast="high"`)

| Elemento / Token               | Light Mode + High Contrast | Dark Mode + High Contrast |
| ------------------------------ | -------------------------- | ------------------------- |
| Fundo principal (`--bg-primary`)| `#FFFFFF`                  | `#121212`                 |
| Fundo sidebar (`--bg-sidebar`) | `#F7F6F3`                  | `#1A1A1A`                 |
| Texto principal (`--text-primary`)| `#242424`               | `#F0EFEA`                 |
| H1 (`--h1-color`)              | `#6D28D9` (Roxo Violeta)   | `#C4B5FD` (Lilás Pastel)  |
| H2 (`--h2-color`)              | `#2563EB` (Azul Oceano)    | `#93C5FD` (Azul Sereno)   |
| H3 (`--h3-color`)              | `#059669` (Verde Esmeralda)| `#6EE7B7` (Menta Pastel)  |
| Links (`--link-color`)         | `#0284C7` (Turquesa Suave) | `#67E8F9` (Ciano Soft)    |
| Blockquote BG                  | `#FEF3C7` (Âmbar Pastel)   | `#1A1D24`                 |
| Blockquote Borda               | `#D97706`                  | `#FDE68A` (Âmbar Soft)    |
| Blocos de Código BG            | `#F1F5F9`                  | `#1E2430`                 |
| Bordas (`--border-color`)      | `#CBD5E1`                  | `#333333`                 |

---

## Funcionalidades

### 1. Toggle de Modo Contraste
- Botão de contraste (ícone de gota/paleta ou sol nítido) posicionado no `SidebarFooter` (ao lado do toggle Light/Dark) e no header mobile.
- Alterna `contrast` entre `'normal'` e `'high'`.
- Salva preferência em `localStorage` sob a chave `'mdview-contrast'`.
- Aplica o atributo `data-contrast="high"` no elemento `<html>`.

### 2. Controles Flutuantes (Floating Controls)
- **Posição:** Canto inferior direito fixo (`bottom: 24px`, `right: 24px` no desktop; `bottom: 20px`, `right: 16px` no mobile).
- **Botão Voltar ao Topo (↑):**
  - Aparece quando a rolagem da página for maior que `300px`.
  - Animação de entrada `fadeIn` + `scale`.
  - Ao clicar, executa `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- **Botão Índice Flutuante (📑):**
  - Visível sempre que um arquivo Markdown estiver selecionado.
  - Ao clicar, abre/fecha um **Popover do Sumário (TOC Popover)** flutuante fixado acima do botão.
  - O popover exibe os capítulos/seções extraídos do Markdown.
  - Ao clicar num capítulo, o popover fecha e a página rola suavemente até o título correspondente.

### 3. Melhorias de Usabilidade Mobile
- **Header Fixo Mobile:** Bar no topo da tela em telas `< 768px` contendo:
  - Botão hambúrguer para abrir a sidebar drawer
  - Nome do arquivo selecionado (truncado)
  - Botão de alternar Contraste
  - Botão do Índice Flutuante
- **Auto-close da Sidebar:** Ao clicar em um arquivo na sidebar em dispositivos móveis, a sidebar fecha automaticamente para dar espaço ao conteúdo.
- **Touch Targets:** Área clicável de pelo menos `44px × 44px` em botões e itens de lista em telas touch.

---

## Componentes Novos / Modificados

- `src/hooks/useContrast.js` [NOVO] — Hook para gerenciamento do modo contraste + localStorage
- `src/components/FloatingControls/FloatingControls.js` [NOVO] — Container dos botões flutuantes (Topo + Índice Popover)
- `src/components/FloatingControls/FloatingControls.module.css` [NOVO]
- `src/components/Sidebar/SidebarFooter.js` [MODIFICAR] — Adição do botão de contraste
- `src/components/MainContent/MarkdownViewer.module.css` [MODIFICAR] — Suporte aos tokens de cores de cabeçalho e contraste
- `src/app/globals.css` [MODIFICAR] — Variáveis de cores para o modo contraste
- `src/app/page.js` [MODIFICAR] — Integração do hook de contraste, header mobile e botões flutuantes
