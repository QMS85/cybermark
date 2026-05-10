# 📟 CyberMark Naekdown Generator

![CyberMark Banner](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200&h=400)

**CyberMark** is a high-performance, responsive markdown editor built for developers, technical writers, and cybersecurity enthusiasts. It combines a sophisticated "terminal-inspired" aesthetic with modern web technologies to provide a seamless writing experience.

## 🚀 Live Demo
You can view the live application on the AI Studio preview environment or deploy it to your own infrastructure.

---

## ✨ Key Features

### 🖥️ High-Performance Editor
-   **Split-Pane View**: Real-time rendering with a side-by-side editor and previewer on desktop.
-   **Mobile Optimized**: Intelligent tabbed interface for smaller screens, ensuring productivity on the go.
-   **Syntax Highlighting**: Deep integration with `highlight.js` for beautiful code snippets in over 100 languages.
-   **GFM Support**: Full support for GitHub Flavored Markdown (Tables, Task Lists, Strikethrough, etc.).

### 🛡️ Cyber-Aesthetic UI
-   **Dark Mode by Design**: Optimized for long coding sessions with a custom "Cyber Black" palette.
-   **Scanline Overlay**: Subtle CRT-style scanlines for a vintage terminal feel.
-   **Grid Layout**: Precision background grid to mimic head-up displays (HUDs).
-   **Monospaced Precision**: Utilizing JetBrains Mono for a professional, code-centric atmosphere.

### 🛠️ Developer Tools
-   **Smart Toolbar**: Quick-access buttons for standard markdown formatting.
-   **Auto-Persistence**: Integrated with `localStorage` to ensure your work is never lost on refresh.
-   **Export Tools**: One-click download as `.md` file or copy to clipboard.
-   **System Stats**: Real-time byte count and document structure tracking.

---

## 🛠️ Tech Stack

-   **Core Framework**: [React 19](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Markdown Engine**: `react-markdown` with `remark-gfm`
-   **Syntax Highlighting**: `rehype-highlight`
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Build Tool**: [Vite 6](https://vitejs.dev/)

---

## 📥 Installation

Follow these steps to run CyberMark locally:

1.  **Clone the Repository** (If exported to GitHub):
    ```bash
    git clone https://github.com/your-username/cybermark.git
    cd cybermark
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start Development Server**:
    ```bash
    npm run dev
    ```

4.  **Build for Production**:
    ```bash
    npm run build
    ```

---

## ☁️ Deployment Options

This project is a static Single Page Application (SPA). You can deploy it to:

### 1. Google Cloud Run (Via AI Studio)
The easiest way if you are already in AI Studio. Click the **Deploy** button in the top right corner to push to a production-grade Cloud Run environment.

### 2. Vercel / Netlify / Cloudflare Pages
1.  Connect your GitHub repository.
2.  Set Build Command: `npm run build`
3.  Set Output Directory: `dist`
4.  Standard SPA fallback: Ensure your provider handles client-side routing (usually unnecessary for this app as it's a single page).

### 3. GitHub Pages
1.  Configure the `base` in `vite.config.ts` if deploying to a sub-path.
2.  Use the `gh-pages` package or GitHub Actions to push the `dist` folder.

---

## 🔧 Project Structure

```text
/src
  ├── App.tsx          # Main application logic and UI
  ├── main.tsx         # React entry point
  ├── index.css        # Global styles & Tailwind theme
  ├── components/      # UI building blocks
  └── lib/             # Utility functions
/public               # Static assets
index.html            # HTML Shell
package.json          # Dependency management
vite.config.ts        # Build configuration
```

---

## 📜 License
CyberMark is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have ideas for "World Domination" features.

---

> "Hack the planet, one markdown file at a time." ⚡
