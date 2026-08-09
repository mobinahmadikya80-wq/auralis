# Auralis — Open Audiology Educational Platform & Clinical Science Suite

[![Build & Deploy](https://github.com/auralis-audiology/auralis/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/auralis-audiology/auralis/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8.svg)](https://tailwindcss.com/)

**Auralis** is a premier open-access academic platform, interactive clinical laboratory simulator, and comprehensive resource hub for Audiology students, Au.D. residents, researchers, faculty, and clinical audiologists worldwide.

Designed with Apple HIG design principles, spring physics, and WCAG 2.1 AA accessibility standards, Auralis provides a unified workspace for hearing science education, electrophysiology protocols, and patient diagnostic simulation.

---

## 🌟 Key Features & Modules

### 1. 🎧 Interactive 3D Ear Anatomy & Tonotopic Map
- **3D Interactive Structural Explorer**: High-precision rendering of Outer Ear (Pinna, Ear Canal), Middle Ear (Tympanic Membrane, Malleus, Incus, Stapes, Eustachian Tube), and Inner Ear (Cochlea, Vestibule, Semicircular Canals, Auditory Nerve).
- **Basilar Membrane Tonotopic Mapping**: Visual frequency tuning curve from 20,000 Hz at the high-frequency cochlear base to 20 Hz at the low-frequency helicotrema apex.
- **Pathology Toggles**: Simulate Otitis Media with Effusion (OME), Otosclerosis stapes fixation, Noise-Induced Hearing Loss (NIHL) hair cell damage, and Vestibular Schwannoma.

### 2. 📊 ANSI S3.6 Calibrated Audiogram Simulator Lab
- **Pure Tone Audiometry (PTA)**: Interactive threshold plotting for Air Conduction (AC) and Bone Conduction (BC) across 125 Hz – 8000 Hz.
- **Clinical Masking Engine**: Simulate narrow-band noise (NBN) masking on the non-test ear (NTE) to prevent cross-hearing shadow curves.
- **Automated Diagnostic Analysis**: Auto-calculates Pure Tone Average (PTA 500/1000/2000 Hz), detects Carhart Notch at 2000 Hz (otosclerosis), 4 kHz noise notches, and calculates air-bone gaps (ABG).

### 3. 🧮 Clinical Calculators & Tools Suite
- **Speech Intelligibility Index (SII)**: Count-The-Dots audiology SII calculator (Mueller & Killion method) estimating speech audibility percentage.
- **RETSPL Sound Pressure Level Converter**: Convert dB HL (Hearing Level) to dB SPL (Sound Pressure Level) according to ANSI S3.6 reference equivalent threshold values across insert phones and TDH-39 headphones.
- **NIOSH & OSHA Noise Dose Calculator**: Compute daily noise dose percentage and Time Weighted Average (TWA) with 3 dB and 5 dB exchange rates.
- **Audiometric Threshold Classifier**: Automatic classification of hearing loss severity (Normal, Mild, Moderate, Moderately-Severe, Severe, Profound).

### 4. 🩺 Clinical Patient Case Studies
- Real patient diagnostic case batteries featuring otoscopy images, tympanometry curves (Type A, As, Ad, B, C), ABR waveforms, speech recognition scores (WRS), and step-by-step diagnostic reasoning.

### 5. 🤖 Gemini AI Clinical Partner
- Powered by Google Gemini AI, offering real-time guidance on electrophysiology (ABR Wave I/III/V interpeak latencies, ASSR, OAEs), vestibular diagnostics (VNG, cVEMP/oVEMP, vHIT), and hearing aid fitting protocols (WDRC, REM).

### 6. 📚 Open Academic Hub & Literature Archive
- **38+ Graduate Courses**: Electrophysiology, Vestibular Evaluation, Pediatric Audiology, Amplification, Cochlear Implants, CAPD.
- **Faculty Directory**: Profiles of leading Au.D. and Ph.D. professors and clinical instructors.
- **Video Lectures & Media**: High-definition clinical video demonstrations and slide decks.
- **Peer-Reviewed Research Archive**: Downloadable PDFs, monographs, and research summaries.

---

## ⚡ Tech Stack & Performance Architecture

- **Frontend Framework**: React 18 with TypeScript 5.5
- **Build System**: Vite 5.0 with custom Rollup manual chunks code-splitting
- **Styling**: Tailwind CSS v4 with custom dark mode and glassmorphism utilities
- **Animations**: `motion/react` (Framer Motion) with spring physics and HIG easing
- **Data Visualization**: Recharts & D3 for interactive audiometric charts and spectrum analyzer
- **Icons**: Lucide React
- **SEO & PWA**: JSON-LD Structured Data, OpenGraph tags, Twitter Cards, Sitemap XML, RSS 2.0 Feed, Webmanifest

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

```bash
# 1. Clone the repository
git clone https://github.com/auralis-audiology/auralis.git
cd auralis

# 2. Install dependencies
npm install

# 3. Start the local development server (runs on http://localhost:3000)
npm run dev
```

### Production Build & Verification

```bash
# Type-check with TypeScript compiler
npm run lint

# Build production bundle with esbuild & Vite
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 Documentation Index

- [🚀 Deployment Guide](DEPLOYMENT.md) — Step-by-step instructions for GitHub Pages, Cloudflare Pages, Vercel, and Netlify.
- [🏛️ Architecture & Design System](ARCHITECTURE.md) — Component architecture, state management, and design system specifications.
- [🛠️ Maintenance & Operations Guide](MAINTENANCE.md) — Testing protocols, data update procedures, and performance monitoring.
- [🤝 Contributing & Expansion Roadmap](CONTRIBUTING.md) — Guidelines for contributing code, adding clinical cases, and future feature expansion.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p center>
  Designed with precision for the global audiological science community.
</p>
