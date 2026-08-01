<div align="center">

# 📝 MDView — Premium Client-Side Markdown Reader

  <p align="center">
    <b>Fast, Beautiful, Privacy-First Markdown Viewer for the Browser</b>
    <br />
    <i>Visualizador de Markdown rápido, elegante e privado direto no seu navegador.</i>
  </p>

  <p align="center">
    <a href="https://github.com/WeslleyMouraDev/mdview/stargazers"><img src="https://img.shields.io/github/stars/WeslleyMouraDev/mdview?style=for-the-badge&color=2EAADC" alt="Stars" /></a>
    <a href="https://github.com/WeslleyMouraDev/mdview/network/members"><img src="https://img.shields.io/github/forks/WeslleyMouraDev/mdview?style=for-the-badge&color=2EAADC" alt="Forks" /></a>
    <a href="https://github.com/WeslleyMouraDev/mdview/blob/main/LICENSE"><img src="https://img.shields.io/github/license/WeslleyMouraDev/mdview?style=for-the-badge&color=2EAADC" alt="License" /></a>
    <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel" /></a>
  </p>

  <p align="center">
    <a href="#-english">English</a> •
    <a href="#-português-br">Português (BR)</a> •
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Quickstart</a>
  </p>

</div>

---

## 🌟 Support MDView / Apoie o Projeto

If you find **MDView** helpful or cool, please give this repository a **⭐ Star**! It helps the project grow and reach more developers.

*Se você gostou do **MDView**, por favor deixe uma **⭐ Star** neste repositório! Isso ajuda o projeto a crescer.*

---

## 🇬🇧 English

**MDView** is a modern, lightweight, client-side web application designed to render `.md` files instantly with a clean, Notion-inspired reading experience. Drag and drop multiple Markdown files directly into your browser, navigate seamlessly via a collapsible sidebar, jump between chapters using an interactive table of contents, and export your files to multi-page PDF or standalone HTML without any server overhead.

### Key Highlights
- 🔒 **100% Private & Client-Side:** Your files never leave your browser.
- 💾 **IndexedDB Local Persistence:** Files remain saved between browser sessions via Dexie.js.
- 🎨 **Notion-Like Typography & Dual Contrast Modes:** Light & Dark themes with optional eye-friendly Pastel High Contrast modes.
- 📄 **Multi-Page PDF & Standalone HTML Export:** Print-optimized PDF generation that never clips content.
- 📱 **Mobile First & Responsive:** Drawer menu, 44px touch targets, fixed mobile header, and floating navigation controls.

---

## 🇧🇷 Português (BR)

O **MDView** é uma aplicação web moderna e leve criada para renderizar arquivos `.md` instantaneamente no navegador com uma experiência de leitura inspirada no Notion. Arraste e solte múltiplos arquivos Markdown, navegue através de uma barra lateral colapsável, salte para qualquer seção usando o índice flutuante e exporte para PDF de múltiplas páginas ou HTML standalone — 100% no cliente e sem enviar nenhum dado a servidores.

### Destaques do Projeto
- 🔒 **100% Privado e No-Navegador:** Seus arquivos nunca saem do seu dispositivo.
- 💾 **Persistência Local via IndexedDB:** Arquivos salvos entre sessões via Dexie.js.
- 🎨 **Tipografia Estilo Notion & Modo Contraste Pastel:** Temas Light e Dark com opção de Alto Contraste com cores pastéis agradáveis à vista.
- 📄 **Exportação para PDF Multi-Página & HTML:** PDF formatado para impressão sem cortar o conteúdo.
- 📱 **Mobile First & Totalmente Responsivo:** Header fixo mobile, menu gaveta, alvos de toque de 44px e botões flutuantes.

---

## ✨ Features

- **⚡ Multi-File Drag & Drop:** Drop `.md` files anywhere on the screen with an animated overlay indicator.
- **📚 Interactive Sidebar:** Search, sort by name or recent date, preview file size, and remove files.
- **📑 Auto-Generated Table of Contents (TOC):** Top-of-page index and floating TOC popover for quick chapter jumps.
- **⬆️ Floating Navigation Controls:** Smooth scroll-to-top button appearing dynamically when scrolling.
- **🎨 Pastel High-Contrast Themes:** Specialized high-contrast modes designed with soft pastel accents to avoid eye strain.
- **🖨️ Multi-Page PDF Printing:** Seamless `@media print` layout that prints complete long documents cleanly.
- **🌐 Standalone HTML Export:** Download fully self-contained HTML files with embedded CSS styles.

---

## 🛠️ Tech Stack

| Component            | Technology                                            |
| -------------------- | ----------------------------------------------------- |
| **Framework**        | Next.js 14+ (App Router, Client Components)          |
| **Language**         | JavaScript (ES6+)                                     |
| **Markdown Parsing** | `react-markdown` + `remark-gfm`                       |
| **Code Highlighting**| `rehype-highlight` + `highlight.js` (GitHub theme)   |
| **Local Database**   | `Dexie.js` (IndexedDB Wrapper)                        |
| **Styling**          | CSS Modules + Native CSS Custom Properties            |
| **Fonts**            | Google Fonts (`Inter` for UI, `JetBrains Mono` code)  |
| **Deployment**       | Vercel                                                |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/WeslleyMouraDev/mdview.git
   cd mdview
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000` to view MDView locally.

---

## 📦 Deployment

Deploy easily to **Vercel** with zero extra configuration required:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/WeslleyMouraDev/mdview)

Or using the Vercel CLI:
```bash
npx vercel
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/WeslleyMouraDev/mdview/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/WeslleyMouraDev">Weslley Moura</a></sub>
</div>
