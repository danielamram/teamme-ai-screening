# 🚀 ATS AI Screening - Chrome Extension

> An AI-powered candidate screening sidebar for ATS platforms with premium glassmorphism UI

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb.svg)](https://reactjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646cff.svg)](https://vitejs.dev/)

## 📋 Overview

A production-ready Chrome extension that adds an AI-powered candidate screening sidebar to major ATS platforms. Features a beautiful glassmorphism design with smooth animations, score visualizations, and detailed candidate analysis.

## ✨ Features

### 🎨 **Premium UI/UX**

- **Octotree-style collapsible sidebar** on the left side
- **Glassmorphism design** with deep navy/indigo theme
- **Smooth animations** - 300ms slide transitions, count-up effects, shimmer loading
- **Color-coded scoring** - Red/orange/yellow/green based on candidate scores
- **Responsive design** - Works on all screen sizes

### 🧠 **AI Analysis Components**

- **Overall Score** - Animated circular progress with real-time count-up
- **Key Metrics** - Skills, Experience, Education with visual progress bars
- **Strengths Analysis** - Highlighted key strengths with icons
- **Weaknesses Review** - Areas for improvement
- **Final Recommendation** - Strong Hire / Consider / Pass with confidence %

### ⚡ **Performance**

- **Shadow DOM isolation** - No style conflicts with host pages
- **Efficient state management** - React hooks with Chrome storage sync
- **Fast loading** - Code splitting and optimized bundles
- **HMR support** - Hot module replacement in development

### 🎯 **Developer Experience**

- **TypeScript strict mode** - Type-safe codebase
- **ESLint + Prettier** - Consistent code quality
- **Husky + lint-staged** - Pre-commit hooks
- **Conventional commits** - Standardized commit messages

## 🖼️ Screenshots

### Sidebar Open (Left Side)

```
┌─────────────────────────────┐
│ 🤖 AI Screening Analysis    │ ←── Header with candidate selector
├─────────────────────────────┤
│     ┌─────────┐             │
│     │   87    │             │ ←── Animated score circle
│     └─────────┘             │
│                              │
│ 📊 Skills:     ████████▓░ 92│ ←── Metrics with progress bars
│ 💼 Experience: ███████░░░ 85│
│ 🎓 Education:  ███████░░░ 84│
│                              │
│ ✅ Key Strengths             │ ←── Strengths list
│ • Expert in React/TypeScript │
│ • Led 3 major product launch │
│                              │
│ ⚠️ Areas for Improvement     │ ←── Weaknesses list
│ • Limited Python experience  │
│                              │
│ 🎯 Strong Hire (94% conf.)   │ ←── Final recommendation
│ Sarah is an exceptional...   │
│                              │
│ [View Report] [Share]        │
└─────────────────────────────┘
    │← Toggle tab (always visible)
```

## 🏗️ Architecture

### Tech Stack

- **React 19** - Functional components with hooks
- **TypeScript 5** - Strict type checking
- **Tailwind CSS 4** - Utility-first styling
- **DaisyUI 5** - Component library
- **Vite 6** - Build tool with HMR
- **CRXJS** - Chrome extension plugin
- **Lucide React** - Icon library

### Project Structure

```
src/
├── components/sidebar/      # 7 UI components
├── hooks/                   # Custom React hooks
├── utils/                   # Helper functions
├── types/                   # TypeScript definitions
├── data/                    # Mock data (3 candidates)
├── constants/               # Design system
├── background/              # Service worker
├── content/                 # Content scripts
├── popup/                   # Extension popup
└── assets/                  # Styles and fonts
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.x
- pnpm >= 8.15.0

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd teamme-ai-screening
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Start development**

```bash
pnpm dev
```

4. **Load in Chrome**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist_chrome` folder

### Build for Production

```bash
# Chrome
pnpm build

# Firefox
pnpm build:firefox
```

## 📦 Mock Data

The extension includes 3 mock candidate profiles:

### 1. **Sarah Chen** - Score: 87/100 (Strong Hire)

- **Position**: Senior Full-Stack Engineer
- **Strengths**: Expert in React/TypeScript, led 3 major launches, great system design
- **Weaknesses**: Limited Python experience
- **Recommendation**: Strong Hire with 94% confidence

### 2. **Marcus Johnson** - Score: 66/100 (Consider)

- **Position**: Mid-Level Software Engineer
- **Strengths**: Solid JavaScript/React foundation, quick learner
- **Weaknesses**: Limited TypeScript, no leadership experience, job-hopping
- **Recommendation**: Consider with 68% confidence

### 3. **David Martinez** - Score: 43/100 (Pass)

- **Position**: Software Engineer
- **Strengths**: Basic web development fundamentals, completed bootcamp
- **Weaknesses**: Very limited experience (6 months), no React/TypeScript
- **Recommendation**: Pass with 89% confidence

## 🎮 Usage

### Sidebar Controls

- **Toggle Tab**: Click the tab on the left edge to collapse/expand
- **ESC Key**: Press ESC to close the sidebar
- **Candidate Selector**: Click dropdown in header to switch candidates
- **Popup**: Click extension icon for quick toggle and settings

### Keyboard Shortcuts

- `ESC` - Close sidebar

## 🛠️ Development

### Scripts

```bash
pnpm dev              # Dev mode with HMR
pnpm dev:firefox      # Firefox dev mode
pnpm build            # Production build (Chrome)
pnpm build:firefox    # Production build (Firefox)
pnpm lint             # Run ESLint
pnpm lint:spell       # Spell check
pnpm preview          # Preview production build
```

### Code Quality

- **ESLint**: Airbnb config with strict rules
- **Prettier**: Auto-formatting on save
- **Husky**: Pre-commit hooks for linting
- **Commitlint**: Conventional commit enforcement

### Adding New Features

See `.cursor/rules/70-feature-generation.mdc` for the complete guide.

## 🎨 Design System

### Colors

- **Primary Navy**: `#1e293b`
- **Indigo Accent**: `#4f46e5`
- **Success Green**: `#10b981`
- **Warning Orange**: `#f59e0b`
- **Error Red**: `#ef4444`

### Typography

- **Font**: Inter (9 weights)
- **Sizes**: 12px - 36px
- **Line Heights**: 1.25 - 1.75

### Animations

- **Duration**: 150ms (fast), 300ms (normal), 500ms (slow)
- **Easing**: Cubic bezier curves
- **Effects**: Slide, fade, pulse, shimmer, count-up

## 🌐 Supported ATS Platforms

- ✅ Greenhouse.io
- ✅ Lever.co
- ✅ Workday
- ✅ Taleo
- ✅ iCIMS
- ✅ BambooHR
- ✅ ADP
- ✅ SmartRecruiters
- ✅ JazzHR
- ✅ Recruiterbox

## 🔧 Configuration

### Manifest Settings

```typescript
// src/manifest.ts
{
  permissions: ['activeTab', 'storage', 'scripting'],
  host_permissions: ['<all_urls>'],
  content_scripts: [...],
  background: {...}
}
```

### Storage Schema

```typescript
{
  sidebarState: { isOpen: boolean, selectedCandidateId: string },
  selectedCandidateId: string,
  theme: 'light' | 'dark'
}
```

## 📝 Troubleshooting

### Sidebar not showing?

- Check if content script is injected: Open DevTools → Elements → Look for Shadow DOM
- Verify extension is enabled in chrome://extensions/
- Try reloading the page

### Styles not applying?

- Shadow DOM isolation is working correctly
- All styles are scoped to `#my-ext`
- Check if PostCSS is prefixing selectors correctly

### Build errors?

```bash
# Clean and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- **DaisyUI** - Beautiful component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Icon library
- **CRXJS** - Vite plugin for Chrome extensions
- **Octotree** - Inspiration for collapsible sidebar design

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
