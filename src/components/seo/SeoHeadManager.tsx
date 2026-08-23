import React, { useEffect } from 'react';

interface SeoHeadManagerProps {
  activeTab: string;
}

const TAB_SEO_DATA: Record<string, { title: string; description: string; path: string }> = {
  home: {
    title: 'Auralis — Open Audiology Educational Platform & Clinical Hub',
    description: 'Premier educational archive, 3D ear anatomy, ANSI audiogram simulators, ABR electrophysiology protocols, and AI tutor for audiology students and clinicians.',
    path: '',
  },
  search: {
    title: 'Unified Search Engine — Auralis Audiology Archive',
    description: 'Instant zero-latency search across courses, faculty, videos, textbooks, slides, research papers, and PDFs.',
    path: 'search',
  },
  courses: {
    title: 'Clinical Audiology Courses & Curriculum — Auralis',
    description: 'Structured graduate and doctoral level audiology course modules: Electrophysiology, Vestibular Evaluation, Pediatric Audiology, Hearing Aids, and Cochlear Implants.',
    path: 'courses',
  },
  teachers: {
    title: 'Faculty & Clinical Instructors — Auralis Audiology',
    description: 'Directory of world-renowned Au.D. and Ph.D. faculty professors, researchers, and clinical instructors.',
    path: 'teachers',
  },
  videos: {
    title: 'Video Lectures & Clinical Demonstrations — Auralis',
    description: 'High-definition video lectures covering otoscopy, VNG caloric testing, BPPV Epley maneuvers, REM probe microphone measurements, and ABR wave identification.',
    path: 'videos',
  },
  pdf: {
    title: 'PDF Resource Library & Handouts — Auralis Audiology',
    description: 'Downloadable clinical reference charts, RETSPL dB SPL calibration tables, ANSI standards, and patient diagnostic batteries in PDF format.',
    path: 'pdf',
  },
  slides: {
    title: 'Presentation Slides & Lecture Decks — Auralis Audiology',
    description: 'Comprehensive PowerPoint and PDF slide decks covering acoustic reflex decay, central auditory processing disorder (CAPD), and otoacoustic emissions (OAE).',
    path: 'slides',
  },
  books: {
    title: 'Clinical Textbooks & Reference Monographs — Auralis',
    description: 'Essential audiological textbooks, handbook chapters, and clinical science monographs.',
    path: 'books',
  },
  research: {
    title: 'Peer-Reviewed Research Papers & Literature — Auralis',
    description: 'Curated peer-reviewed research papers in hearing science, tinnitus neurophysiology, and auditory neural decoding.',
    path: 'research',
  },
  announcements: {
    title: 'Academic Announcements & Conference Bulletins — Auralis',
    description: 'Latest bulletins, workshop schedules, AAA/ASHA conference updates, and fellowship opportunities in audiology.',
    path: 'announcements',
  },
  downloads: {
    title: 'Clinical Media Downloads & Assets — Auralis Audiology',
    description: 'High-resolution anatomical schematics, audio stimulus sound clips (chirps, speech noise, warble tones), and clinical protocol templates.',
    path: 'downloads',
  },
  anatomy: {
    title: 'Interactive 3D Ear Anatomy & Tonotopic Simulator — Auralis',
    description: '3D interactive outer, middle, and inner ear anatomy with cochlear traveling wave dynamics and basilar membrane frequency mapping.',
    path: 'anatomy',
  },
  simulator: {
    title: 'ANSI S3.6 Calibrated Audiogram Simulator & PTA Lab — Auralis',
    description: 'Simulate air & bone conduction thresholds, calculate pure tone averages (PTA), plot Carhart notch, and practice clinical masking.',
    path: 'simulator',
  },
  tools: {
    title: 'Audiometric Calculators & Clinical Tools Suite — Auralis',
    description: 'Clinical tools suite including count-the-dots SII score, RETSPL dB SPL sound pressure converters, and NIOSH noise dose calculators.',
    path: 'tools',
  },
  cases: {
    title: 'Real Clinical Patient Case Studies — Auralis Audiology',
    description: 'Interactive diagnostic case batteries with otoscopy images, tympanometry curves, ABR waveforms, and final patient management plans.',
    path: 'cases',
  },
  aitutor: {
    title: 'Gemini AI Clinical Tutor & Assistant — Auralis Audiology',
    description: 'Consult our AI Clinical Tutor for instant diagnostic guidance, electrophysiology explanation, and literature synthesis.',
    path: 'aitutor',
  },
  saved: {
    title: 'Saved Bookmarks & Personal Clinical Notes — Auralis',
    description: 'Your saved audiological resources, bookmarked papers, and personal diagnostic case notes.',
    path: 'saved',
  },
  about: {
    title: 'About Auralis — Open Audiology Education Mission',
    description: 'Learn about Auralis mission to democratize world-class audiological education and clinical training tools globally.',
    path: 'about',
  },
  contact: {
    title: 'Contact Academic & Faculty Support — Auralis Audiology',
    description: 'Get in touch with Auralis faculty, report research corrections, or request institution partnership access.',
    path: 'contact',
  },
};

export const SeoHeadManager: React.FC<SeoHeadManagerProps> = ({ activeTab }) => {
  useEffect(() => {
    const seo = TAB_SEO_DATA[activeTab] || TAB_SEO_DATA.home;

    // 1. Update Document Title
    document.title = seo.title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', seo.description);
      document.head.appendChild(metaDesc);
    }

    // 3. Update OG Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    // 4. Update Canonical Link
    const canonicalUrl = `https://auralis-audiology.org/${seo.path}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

  }, [activeTab]);

  return null;
};
