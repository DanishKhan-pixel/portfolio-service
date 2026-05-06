# ForgefoLio — Developer Portfolio Frontend

A **production-ready React portfolio** for a Python/Django Backend Engineer. Built with Vite + TypeScript, fully integrated with the Django REST API backend.

## 🖥️ Preview

- **Dark theme** (default) with electric blue accents
- **Light theme** toggle with localStorage persistence
- **Terminal-inspired** UI elements (code blocks, monospace headings, file-path subtitles)
- **Smooth animations** powered by Framer Motion
- **Fully responsive** across desktop, tablet, and mobile

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- Backend API running at `http://localhost:8000` (see [portfolio_backend](../portfolio_backend/))

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

| Variable             | Default                          | Description          |
| -------------------- | -------------------------------- | -------------------- |
| `VITE_API_BASE_URL`  | `http://localhost:8000/api`      | Backend API base URL |

---

## 📁 Project Structure

```
src/
├── components/          # UI Components
│   ├── Navbar.tsx           # Sticky nav with section highlighting & theme toggle
│   ├── Hero.tsx             # Hero section with animated terminal
│   ├── About.tsx            # Professional summary & philosophy
│   ├── TechStack.tsx        # Filterable tech stack with progress bars
│   ├── Projects.tsx         # Project cards with detail modal
│   ├── Architecture.tsx     # System design section with flow diagram
│   ├── ExperienceTimeline.tsx # Vertical timeline with tech tags
│   ├── Education.tsx        # Education cards
│   ├── Contact.tsx          # Contact info + mailto form
│   ├── Footer.tsx           # Footer with navigation & social links
│   ├── SectionWrapper.tsx   # Animated section container (Framer Motion)
│   ├── Skeleton.tsx         # Skeleton loading component
│   └── ErrorState.tsx       # Error fallback with retry
├── context/
│   └── ThemeContext.tsx      # Dark/Light theme provider
├── hooks/
│   ├── useApi.ts            # Generic API data fetching hook
│   └── useActiveSection.ts  # IntersectionObserver for nav highlighting
├── services/
│   └── api.ts               # Centralized Axios API client
├── types/
│   └── index.ts             # TypeScript interfaces matching Django models
├── utils/
│   └── helpers.ts           # Scroll, date format, icon utilities
├── App.tsx                  # Main app with lazy-loaded sections
├── main.tsx                 # Entry point with ThemeProvider
└── index.css                # Complete design system (CSS custom properties)
```

---

## 🔌 API Integration

The frontend consumes these read-only endpoints from the Django backend:

| Endpoint                  | Component(s)               |
| ------------------------- | -------------------------- |
| `GET /api/profile/`       | Hero, About, Contact, Footer |
| `GET /api/skills/`        | TechStack                  |
| `GET /api/projects/`      | Projects                   |
| `GET /api/projects/:slug/`| Projects (detail modal)    |
| `GET /api/experience/`    | ExperienceTimeline         |
| `GET /api/education/`     | Education                  |

All API calls go through `src/services/api.ts` (Axios instance with interceptors).

Data fetching uses the `useApi` custom hook which provides:
- `data` — typed response
- `loading` — loading state for skeletons
- `error` — error message
- `refetch` — retry function

---

## 🎨 Design System

Built entirely with **CSS custom properties** for seamless theme switching.

### Themes
- `[data-theme='dark']` — charcoal/navy base, electric blue accents
- `[data-theme='light']` — clean white base, deeper blue accents

### Typography
- **Sans-serif**: Inter (headings, body)
- **Monospace**: JetBrains Mono (section labels, code blocks, terminal)

### Key Design Tokens
- `--color-accent` — primary blue
- `--color-bg-card` — glassmorphism card backgrounds
- `--color-terminal-*` — terminal/code block colors
- `--font-mono` / `--font-sans` — typography
- `--radius-*` / `--space-*` — spacing and border radius

---

## 🏗️ Build & Deploy

```bash
# TypeScript check + production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

The production build outputs to `dist/` with code-split chunks per section for optimal loading.

---

## 🧩 Key Features

- **Lazy-loaded sections** — Each section below the fold is code-split
- **Skeleton loaders** — Shimmer animation while API data loads
- **Error boundaries** — Graceful fallback with retry button
- **Theme persistence** — Saved in `localStorage`
- **Smooth scroll** — CSS `scroll-behavior: smooth` + JS `scrollIntoView`
- **Section tracking** — `IntersectionObserver` highlights active navbar link
- **Animated terminal** — Typewriter-style hero animation
- **Project modal** — Click any project card for full architecture details
- **Responsive grid** — CSS Grid with mobile-first breakpoints
- **SEO optimized** — Meta tags, semantic HTML, single `<h1>`, unique IDs

---

## 📦 Dependencies

| Package          | Purpose                          |
| ---------------- | -------------------------------- |
| `react`          | UI framework                     |
| `axios`          | HTTP client for API calls        |
| `framer-motion`  | Scroll & entrance animations     |
| `lucide-react`   | Icon system                      |
| `react-icons`    | Technology-specific icons (Si*)   |

---

