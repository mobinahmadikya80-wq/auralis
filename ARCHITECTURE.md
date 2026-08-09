# 🏛️ Auralis System Architecture & Design System

This document outlines the architectural patterns, component taxonomy, state management, and design system specifications of the **Auralis Audiology Platform**.

---

## 1. 📂 Project File Hierarchy

```
/
├── public/                     # Static SEO & PWA Assets
│   ├── favicon.ico             # Platform Favicon
│   ├── robots.txt              # Search Engine Crawling Directive
│   ├── sitemap.xml             # XML Sitemap Index
│   ├── rss.xml                 # RSS 2.0 Feed
│   └── site.webmanifest        # PWA Manifest Configuration
│
├── src/                        # Source Directory
│   ├── main.tsx                # React DOM Mount Entrypoint
│   ├── App.tsx                 # Root Workspace Layout & View Router
│   ├── index.css               # Global Tailwind CSS v4 Styles & Utilities
│   ├── types.ts                # Shared TypeScript Interfaces & Data Schemas
│   │
│   ├── data/                   # Master Academic Datasets
│   │   ├── resources.ts        # Curriculum Courses, Books, Videos, Papers
│   │   ├── cases.ts            # Clinical Patient Case Studies & Diagnostics
│   │   ├── tools.ts            # Audiometric Calculators Datasets
│   │   ├── anatomy.ts          # 3D Ear Structural Landmarks & Frequencies
│   │   └── cmsStore.ts         # LocalStorage CMS Engine & Seed Data
│   │
│   ├── components/             # UI Components Library
│   │   ├── Navbar.tsx          # Main Header with Navigation Tabs & Command Trigger
│   │   ├── Footer.tsx          # Comprehensive Academic Footer
│   │   ├── Hero.tsx            # Main Landing Hero Banner
│   │   ├── ResourceHub.tsx     # Literature Filterable Grid & Search
│   │   ├── InteractiveEarAnatomy.tsx  # 3D Ear Anatomy & Tonotopic Engine
│   │   ├── AudiogramSimulator.tsx     # ANSI S3.6 Pure-Tone Audiogram Lab
│   │   ├── ToolsSuite.tsx      # Count-the-Dots SII & Noise Dose Suite
│   │   ├── ClinicalCasesView.tsx     # Interactive Patient Diagnostic Battery
│   │   ├── AiTutor.tsx         # Gemini AI Partner Assistant
│   │   ├── SavedWorkspace.tsx  # User Bookmarks & Clinical Note Engine
│   │   ├── CommandPalette.tsx  # Cmd+K Quick Navigation Palette
│   │   ├── CmsAdminLab.tsx     # Administrative Content Studio
│   │   │
│   │   ├── layout/             # Layout Shell Components
│   │   │   ├── FloatingDock.tsx        # Bottom Quick Action Dock
│   │   │   ├── ScrollProgress.tsx      # Top Scroll Progress Line
│   │   │   ├── DarkModeToggle.tsx      # Dark/Light Theme Switcher
│   │   │   └── SidebarDrawer.tsx       # Mobile Slide-over Drawer
│   │   │
│   │   ├── motion/             # Micro-Interaction & Animation Components
│   │   │   ├── ScrollReveal.tsx        # Intersection Observer Reveal Engine
│   │   │   ├── TiltCard.tsx            # 3D Gyroscope Specular Tilt Card
│   │   │   ├── Magnetic.tsx            # Spring Cursor Magnetic Wrapper
│   │   │   ├── MouseSpotlight.tsx      # Radial Spotlight Mouse Follower
│   │   │   ├── PageTransition.tsx      # Apple HIG Route Transition Container
│   │   │   └── PageSkeleton.tsx        # Animated Loading Skeletons
│   │   │
│   │   ├── seo/                # Search Engine Optimization Components
│   │   │   └── SeoHeadManager.tsx      # Dynamic Route Metadata Updater
│   │   │
│   │   └── pages/              # Dedicated Sub-View Pages
│   │       ├── HomePage.tsx            # Platform Hub Landing
│   │       ├── CoursesPage.tsx         # Course Modules Catalog
│   │       ├── TeachersPage.tsx        # Faculty Directory
│   │       ├── VideosPage.tsx          # Video Lectures Grid
│   │       ├── ResearchPage.tsx        # Peer-Reviewed Literature
│   │       ├── BooksPage.tsx           # Clinical Textbooks
│   │       ├── SearchPage.tsx          # Zero-latency Global Search
│   │       └── ...                     # Additional Sub-pages
│   │
├── vite.config.ts              # Vite 5.0 Config with Manual Chunking
├── metadata.json               # Platform Manifest Metadata
└── package.json                # Project Dependencies & Build Scripts
```

---

## 2. ⚡ Performance & Bundle Strategy

Auralis uses **Vite 5.0** with custom Rollup manual chunking to ensure optimal initial page load performance:

```typescript
// vite.config.ts Manual Chunking Strategy
manualChunks(id) {
  if (id.includes('node_modules')) {
    if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
    if (id.includes('motion')) return 'vendor-motion';
    if (id.includes('lucide-react')) return 'vendor-icons';
    if (id.includes('recharts') || id.includes('d3')) return 'vendor-charts';
    return 'vendor-core';
  }
}
```

- **Lazy Component Code Splitting**: All secondary views (`AudiogramSimulator`, `InteractiveEarAnatomy`, `AiTutor`, `ToolsSuite`, sub-pages) are dynamically imported via `React.lazy()` and wrapped in `React.Suspense` with custom skeleton placeholders.

---

## 3. 🎨 Design System & HIG Standards

Auralis strictly enforces **Apple Human Interface Guidelines (HIG)** aesthetic standards:

- **Typography**: Paired display fonts with high contrast ratios meeting WCAG 2.1 AA standards (minimum 4.5:1 text-to-background contrast).
- **Glassmorphism**: Backdrop blur filter (`backdrop-filter: blur(20px) saturate(180%)`) with semi-transparent surfaces (`apple-glass` utility).
- **Spring Physics**: All interactive controls use spring curves (`stiffness: 300–400, damping: 25–30`) rather than linear CSS transitions.
- **Negative Space**: Generous padding (`p-6` to `p-12`) and rhythmic spacing between major sections.
