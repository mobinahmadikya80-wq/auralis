import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { FloatingDock } from './components/layout/FloatingDock';
import { AnimatedBackground } from './components/layout/AnimatedBackground';
import { SidebarDrawer } from './components/layout/SidebarDrawer';

// Eager load critical entry page
import { HomePage } from './components/pages/HomePage';

// Lazy load heavy modules & secondary views for optimal bundle splitting
const InteractiveEarAnatomy = lazy(() => import('./components/InteractiveEarAnatomy').then(m => ({ default: m.InteractiveEarAnatomy })));
const AudiogramSimulator = lazy(() => import('./components/AudiogramSimulator').then(m => ({ default: m.AudiogramSimulator })));
const ToolsSuite = lazy(() => import('./components/ToolsSuite').then(m => ({ default: m.ToolsSuite })));
const ClinicalCasesView = lazy(() => import('./components/ClinicalCasesView').then(m => ({ default: m.ClinicalCasesView })));
const AiTutor = lazy(() => import('./components/AiTutor').then(m => ({ default: m.AiTutor })));
const SavedWorkspace = lazy(() => import('./components/SavedWorkspace').then(m => ({ default: m.SavedWorkspace })));

const CoursesPage = lazy(() => import('./components/pages/CoursesPage').then(m => ({ default: m.CoursesPage })));
const RecentUploadsPage = lazy(() => import('./components/pages/RecentUploadsPage').then(m => ({ default: m.RecentUploadsPage })));
const TeachersPage = lazy(() => import('./components/pages/TeachersPage').then(m => ({ default: m.TeachersPage })));
const VideosPage = lazy(() => import('./components/pages/VideosPage').then(m => ({ default: m.VideosPage })));
const PdfPage = lazy(() => import('./components/pages/PdfPage').then(m => ({ default: m.PdfPage })));
const SlidesPage = lazy(() => import('./components/pages/SlidesPage').then(m => ({ default: m.SlidesPage })));
const BooksPage = lazy(() => import('./components/pages/BooksPage').then(m => ({ default: m.BooksPage })));
const ResearchPage = lazy(() => import('./components/pages/ResearchPage').then(m => ({ default: m.ResearchPage })));
const AnnouncementsPage = lazy(() => import('./components/pages/AnnouncementsPage').then(m => ({ default: m.AnnouncementsPage })));
const DownloadsPage = lazy(() => import('./components/pages/DownloadsPage').then(m => ({ default: m.DownloadsPage })));
const AboutPage = lazy(() => import('./components/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./components/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const SearchPage = lazy(() => import('./components/pages/SearchPage').then(m => ({ default: m.SearchPage })));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

import { MouseSpotlight } from './components/motion/MouseSpotlight';
import { PageTransition } from './components/motion/PageTransition';
import { PageSkeleton } from './components/motion/PageSkeleton';
import { SeoHeadManager } from './components/seo/SeoHeadManager';

import { EducationalResource, NoteItem } from './types';
import { EDUCATIONAL_RESOURCES } from './data/resources';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedResource, setSelectedResource] = useState<EducationalResource | null>(null);
  const [pendingCourseId, setPendingCourseId] = useState<string | null>(null);

  const handleNavigateToCourse = (courseId: string) => {
    setPendingCourseId(courseId);
    setActiveTab('courses');
  };

  // Saved Bookmarks Persistence
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('auralis_saved_ids');
      return stored ? JSON.parse(stored) : ['res_note_abr', 'res_note_vestibular'];
    } catch {
      return ['res_note_abr', 'res_note_vestibular'];
    }
  });

  // Notes Persistence
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const stored = localStorage.getItem('auralis_notes');
      return stored ? JSON.parse(stored) : [
        {
          id: 'note_1',
          title: 'ABR Wave Latency Red Flags',
          content: 'Remember Wave V latency >5.7 ms or IT5 delay >0.3 ms between ears indicates retrocochlear acoustic neuroma evaluation needed.',
          updatedAt: new Date().toLocaleDateString()
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('auralis_saved_ids', JSON.stringify(savedIds));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('auralis_notes', JSON.stringify(notes));
    } catch (e) {
      console.warn('LocalStorage notes save error:', e);
    }
  }, [notes]);

  const toggleBookmark = (res: EducationalResource) => {
    setSavedIds(prev => 
      prev.includes(res.id) ? prev.filter(id => id !== res.id) : [...prev, res.id]
    );
  };

  const savedResourcesList = EDUCATIONAL_RESOURCES.filter(r => savedIds.includes(r.id));

  const handleSelectResourceById = (id: string) => {
    const found = EDUCATIONAL_RESOURCES.find(r => r.id === id);
    if (found) {
      setSelectedResource(found);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSaveNote = (note: NoteItem) => {
    setNotes(prev => [note, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      
      {/* Dynamic SEO Head Manager */}
      <SeoHeadManager activeTab={activeTab} />

      {/* Mouse Spotlight Glow */}
      <MouseSpotlight />

      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Animated Mesh Grid Background */}
      <AnimatedBackground />

      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        savedCount={savedIds.length}
      />

      {/* Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.length}
      />

      {/* Main Workspace Body */}
      <main id="main-content" className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<PageSkeleton />}>
          <PageTransition pageKey={activeTab}>
            {activeTab === 'home' && (
              <HomePage
                onNavigate={setActiveTab}
                onSelectResource={(res) => setSelectedResource(res)}
                onNavigateToCourse={handleNavigateToCourse}
              />
            )}

            {activeTab === 'search' && (
              <SearchPage
                onSelectResource={(res) => setSelectedResource(res)}
              />
            )}

            {activeTab === 'courses' && (
              <CoursesPage
                initialCourseId={pendingCourseId}
                onConsumeInitialCourse={() => setPendingCourseId(null)}
              />
            )}

            {activeTab === 'recent-uploads' && (
              <RecentUploadsPage />
            )}

            {activeTab === 'teachers' && (
              <TeachersPage />
            )}

            {activeTab === 'videos' && (
              <VideosPage />
            )}

            {activeTab === 'pdf' && (
              <PdfPage />
            )}

            {activeTab === 'slides' && (
              <SlidesPage />
            )}

            {activeTab === 'books' && (
              <BooksPage />
            )}

            {activeTab === 'research' && (
              <ResearchPage />
            )}

            {activeTab === 'announcements' && (
              <AnnouncementsPage />
            )}

            {activeTab === 'downloads' && (
              <DownloadsPage />
            )}

            {activeTab === 'about' && (
              <AboutPage />
            )}

            {activeTab === 'contact' && (
              <ContactPage />
            )}

            {activeTab === 'anatomy' && (
              <InteractiveEarAnatomy />
            )}

            {activeTab === 'simulator' && (
              <AudiogramSimulator />
            )}

            {activeTab === 'tools' && (
              <ToolsSuite />
            )}

            {activeTab === 'cases' && (
              <ClinicalCasesView />
            )}

            {activeTab === 'aitutor' && (
              <AiTutor />
            )}

            {activeTab === 'saved' && (
              <SavedWorkspace
                savedResources={savedResourcesList}
                onSelectResource={(res) => setSelectedResource(res)}
                onRemoveSaved={toggleBookmark}
                notes={notes}
                onSaveNote={handleSaveNote}
                onDeleteNote={handleDeleteNote}
              />
            )}

            {activeTab === '404' && (
              <NotFoundPage onNavigateHome={() => setActiveTab('home')} />
            )}
          </PageTransition>
        </Suspense>
      </main>

      {/* Floating Bottom Quick Dock */}
      <FloatingDock
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.length}
      />

      {/* Floating Back To Top Button */}
      <BackToTop />

      {/* Resource Detail Reader Modal */}
      <ResourceDetailModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        isSaved={selectedResource ? savedIds.includes(selectedResource.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      {/* Command Palette Overlay */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={setActiveTab}
        onSelectResource={handleSelectResourceById}
      />

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

    </div>
  );
}
