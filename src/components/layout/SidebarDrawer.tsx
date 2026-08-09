import React from 'react';
import { 
  X, 
  Home,
  BookOpen, 
  Ear, 
  Activity, 
  Calculator, 
  Stethoscope, 
  Sparkles, 
  Bookmark, 
  BrainCircuit,
  GraduationCap,
  UserCheck,
  Video,
  FileText,
  Presentation,
  Library,
  Microscope,
  Megaphone,
  Download,
  Info,
  Mail,
  Search,
  ChevronRight
} from 'lucide-react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  savedCount
}) => {
  if (!isOpen) return null;

  const sections = [
    {
      title: 'Main Navigation',
      items: [
        { id: 'home', label: 'Homepage', icon: Home, desc: 'Overview & Highlights' },
        { id: 'search', label: 'Universal Search', icon: Search, desc: 'Search all resources' },
        { id: 'courses', label: 'Courses & Curriculum', icon: GraduationCap, desc: 'Audiology syllabus' },
        { id: 'teachers', label: 'Clinical Faculty', icon: UserCheck, desc: 'Professors & researchers' },
      ]
    },
    {
      title: 'Interactive Tools & Labs',
      items: [
        { id: 'anatomy', label: '3D Ear Anatomy', icon: Ear, desc: 'Tonotopic frequency map' },
        { id: 'simulator', label: 'Audiogram Simulator', icon: Activity, desc: 'Pure-tone audiogram lab' },
        { id: 'tools', label: 'Clinical Calculators', icon: Calculator, desc: 'SII, noise & RETSPL tools' },
        { id: 'cases', label: 'Clinical Cases', icon: Stethoscope, desc: 'Patient diagnostics battery' },
        { id: 'aitutor', label: 'AI Clinical Partner', icon: Sparkles, desc: 'Gemini-powered tutor', badge: 'AI' },
      ]
    },
    {
      title: 'Media Vault & Resources',
      items: [
        { id: 'library', label: 'Resource Hub', icon: BookOpen, desc: 'Textbooks & notes' },
        { id: 'videos', label: 'Video Demonstrations', icon: Video, desc: 'Otoscopy & ABR videos' },
        { id: 'pdf', label: 'Clinical PDF Manuals', icon: FileText, desc: 'ANSI/BSA guidelines' },
        { id: 'slides', label: 'Lecture Slide Decks', icon: Presentation, desc: 'PowerPoint decks' },
        { id: 'books', label: 'Core Textbooks', icon: Library, desc: 'Digital e-Books' },
        { id: 'research', label: 'Research Papers', icon: Microscope, desc: 'Peer-reviewed studies' },
        { id: 'announcements', label: 'News & Events', icon: Megaphone, desc: 'Conferences & updates' },
        { id: 'downloads', label: 'Downloads Archive', icon: Download, desc: 'Spreadsheets & WAV files' },
        { id: 'saved', label: 'Saved Study Journal', icon: Bookmark, desc: 'Bookmarked notes', count: savedCount },
      ]
    },
    {
      title: 'Platform',
      items: [
        { id: 'about', label: 'About Auralis', icon: Info, desc: 'Mission & Standards' },
        { id: 'contact', label: 'Contact Support', icon: Mail, desc: 'University inquiries' },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Drawer */}
      <div className="relative w-84 max-w-[85vw] bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto">
        
        <div className="space-y-6">
          {/* Top Branding & Close */}
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <BrainCircuit className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-base text-zinc-900 dark:text-white font-display">AURALIS</span>
                <p className="text-[10px] text-zinc-500">Navigation Menu</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="space-y-5">
            {sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-3 pb-1">
                  {sec.title}
                </div>
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-bold'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg ${
                          isActive ? 'bg-cyan-500 text-zinc-950' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-400">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {item.count !== undefined && item.count > 0 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-500 text-zinc-950 font-bold">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Metadata Info */}
        <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500 space-y-1">
          <p className="font-semibold text-zinc-700 dark:text-zinc-300">Auralis Open Platform v1.0</p>
          <p>Built for Audiology Science Education</p>
        </div>

      </div>
    </div>
  );
};
