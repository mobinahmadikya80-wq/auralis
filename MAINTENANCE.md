# 🛠️ Auralis Maintenance & Operations Guide

This guide describes operational routines, data management protocols, dependency update procedures, and debugging workflows for maintaining the **Auralis Audiology Platform**.

---

## 1. 🔄 Updating Datasets & Educational Resources

All master educational datasets reside in `/src/data/`:

### A. Adding New Literature / Course Materials
Edit `/src/data/resources.ts` and add an object conforming to the `EducationalResource` interface defined in `/src/types.ts`:

```typescript
{
  id: 'res-new-001',
  title: 'Advanced Vestibular Evoked Myogenic Potentials (VEMP)',
  description: 'Detailed analysis of cVEMP and oVEMP reflex pathways...',
  type: 'course', // 'course' | 'video' | 'pdf' | 'slide' | 'book' | 'paper'
  topic: 'Vestibular',
  author: 'Dr. Linda Miller, Au.D., Ph.D.',
  institution: 'Johns Hopkins Vestibular Science Lab',
  level: 'Advanced', // 'Beginner' | 'Intermediate' | 'Advanced'
  readTimeOrDuration: '45 mins',
  downloadUrl: 'https://auralis-audiology.org/pdf/vemp-2026.pdf',
  featured: true,
  tags: ['cVEMP', 'oVEMP', 'Saccule', 'Utricle'],
  createdAt: '2026-08-07',
  views: 1240,
  likes: 185
}
```

### B. Adding Clinical Patient Case Studies
Edit `/src/data/cases.ts` to append new patient diagnostic batteries with audiogram threshold data, tympanograms, and diagnostic step-by-step solutions.

---

## 2. 🧪 Testing & Verification Protocols

Run checks before committing changes:

```bash
# TypeScript compiler type validation
npm run lint

# Production compilation test
npm run build
```

---

## 3. 📦 Dependency Management

When updating npm packages:

1. Always test major upgrades in a separate branch.
2. Keep `motion` (Framer Motion) and `@tailwindcss/vite` in sync.
3. Verify that `recharts` chart components render correctly after updates.

---

## 4. 🧹 Clearing Local CMS State

Auralis provides an administrative CMS studio at tab `cms-admin`. If local state needs resetting to seed defaults:

```javascript
// Clear browser localStorage in Developer Tools console
localStorage.removeItem('auralis_cms_resources');
localStorage.removeItem('auralis_notes');
localStorage.removeItem('auralis_saved_resources');
```
