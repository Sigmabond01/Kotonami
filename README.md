# 🌊 Kotonami

<div align="center">

<img src="public/logo.svg" width="100" height="100" alt="Kotonami Logo">

**An immersive streaming platform for Japanese language learning**

[![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge)](LICENSE)

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## 🎯 What is Kotonami?

Kotonami (言波 - "word waves") revolutionizes Japanese language learning through **immersive video streaming**. Unlike traditional learning platforms, Kotonami provides instant, contextual word breakdowns directly within video content, making language acquisition natural and engaging.

### 🌟 Why Choose Kotonami?

- 📺 **100+ Curated Videos** - Anime, daily life vlogs, interviews, podcasts, and audiobooks
- 🔍 **Instant Word Analysis** - Click any subtitle word for immediate translations and explanations
- 🎌 **Cultural Context** - Learn not just language, but Japanese culture through authentic content
- 📱 **Responsive Design** - Perfect experience across all devices
- 🚀 **Zero Setup** - Start learning immediately with no downloads required

---

## ✨ Core Features

<table>
<tr>
<td width="50%">

### 🎥 **Smart Video Player**
- Interactive subtitles with word-by-word breakdown
- Multiple playback speeds for different skill levels
- Seamless streaming with adaptive quality

### 📚 **Content Library**
- **Anime** - Popular series with educational value
- **Daily Life** - Real conversations and situations
- **Interviews** - Professional Japanese speakers
- **Podcasts** - Audio-focused learning
- **Audiobooks** - Literature and storytelling

</td>
<td width="50%">

### 🧠 **Learning Tools**
- Instant dictionary lookups
- Grammar explanations in context
- Word frequency analysis
- Progress tracking

### 🔐 **User Experience**
- Secure authentication system
- Personalized content recommendations
- Bookmarking and favorites
- Cross-device synchronization

</td>
</tr>
</table>

---

## 🛠️ Technology Stack

<div align="center">

| Frontend | Styling | Icons & UI | Backend Integration |
|----------|---------|------------|-------------------|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) | ![Styled Components](https://img.shields.io/badge/-Styled%20Components-DB7093?logo=styled-components&logoColor=white) | ![Tabler Icons](https://img.shields.io/badge/-Tabler%20Icons-1C7ED6?logo=tabler&logoColor=white) | ![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white) |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white) | ![Lucide React](https://img.shields.io/badge/-Lucide-F56565?logo=lucide&logoColor=white) | ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?logo=reactrouter&logoColor=white) |
| | ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?logo=framer&logoColor=white) | ![React Icons](https://img.shields.io/badge/-React%20Icons-E91E63?logoColor=white) | |

</div>

### 📦 Key Dependencies

```json
{
  "dependencies": {
    "@tabler/icons-react": "^3.34.0",
    "axios": "^1.11.0",
    "framer-motion": "^12.23.12",
    "react": "^19.1.0",
    "react-router-dom": "^7.6.3",
    "styled-components": "^6.1.19"
  }
}
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Sigmabond01/Kotonami.git
cd Kotonami

# 2. Install dependencies
npm install
# or
yarn install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your API configurations

# 4. Start development server
npm run dev
# or
yarn dev
```

### 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## 📁 Project Architecture

```
kotonami/
├── 📂 public/                    # Static assets
│   ├── 🖼️ images/              # Logo, examples, characters
│   └── 🔤 fonts/               # Custom fonts (Yu Mincho)
├── 📂 src/
│   ├── 📂 components/           # Reusable UI components
│   │   ├── 🎬 InteractiveSubtitle.jsx
│   │   ├── 💬 WordTooltip.jsx
│   │   └── 🎨 ui/              # Base UI components
│   ├── 📂 pages/               # Route-based page components
│   │   ├── 🎌 Anime/
│   │   ├── 🎧 AudioBooks/
│   │   ├── 🎙️ Interviews/
│   │   └── 📻 Podcasts/
│   ├── 📂 hooks/               # Custom React hooks
│   │   ├── 🔐 useAuth.js
│   │   └── 🎥 useVideoSubtitles.js
│   ├── 📂 api/                 # API integration
│   └── 📂 lib/                 # Utility functions
└── ⚙️ Configuration files
```

---

## 🎮 Usage Examples

### Basic Video Interaction

```javascript
// Click on any subtitle word for instant breakdown
<InteractiveSubtitle 
  text="こんにちは、世界！" 
  onWordClick={(word) => showDefinition(word)}
/>
```

### API Integration

```javascript
// Fetch video content with subtitles
const { video, subtitles, loading } = useVideoSubtitles(videoId);
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help make Kotonami better:

### 🐛 Bug Reports
Found a bug? [Open an issue](../../issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 💡 Feature Requests
Have an idea? [Start a discussion](../../discussions) about:
- The problem your feature would solve
- Proposed solution
- Alternative solutions considered

### 🔧 Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Code** your changes following our style guide
4. **Test** your changes thoroughly
5. **Commit** with conventional commits: `git commit -m 'feat: add amazing feature'`
6. **Push** to your branch: `git push origin feature/amazing-feature`
7. **Open** a Pull Request with detailed description

### 📝 Coding Standards

- Follow ESLint configuration
- Use conventional commit messages
- Write meaningful component and function names
- Add JSDoc comments for complex functions
- Ensure mobile responsiveness

---

## 📚 Documentation

| Resource | Description |
|----------|-------------|
| [API Documentation](#) | Complete API reference and examples |
| [Component Library](#) | Reusable component documentation |
| [Deployment Guide](#) | Step-by-step deployment instructions |
| [Contributing Guide](#) | Detailed contribution guidelines |

---

## 🗺️ Roadmap

### 🎯 Current Focus
- [ ] Mobile app development (React Native)
- [ ] Offline viewing capabilities
- [ ] Advanced progress tracking
- [ ] Community features (comments, ratings)

### 🚀 Future Plans
- [ ] AI-powered content recommendations
- [ ] Voice recognition practice
- [ ] Gamification elements
- [ ] Multi-language support expansion

---

## 📊 Statistics

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/Sigmabond01/Kotonami?style=social)
![GitHub Forks](https://img.shields.io/github/forks/Sigmabond01/Kotonami?style=social)
![GitHub Issues](https://img.shields.io/github/issues/Sigmabond01/Kotonami)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Sigmabond01/Kotonami)

</div>

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Yu Mincho Font** - For beautiful Japanese typography
- **X(Twitter) Community** - For supporting and encouraging me
- **Content Creators** - For providing educational Japanese content
- **Beta Testers** - For valuable feedback and suggestions

---

<div align="center">

**Made with ❤️ for Japanese language learners worldwide**

[⬆ Back to Top](#-kotonami)

</div>
