import React from 'react';
import { BrainCircuit, Heart, Rss, FileCode, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-xs py-12 transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand Manifesto */}
          <div className="space-y-3 sm:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-zinc-950 rounded-[6px] flex items-center justify-center">
                  <BrainCircuit className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-white font-display">
                AURALIS
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-md">
              Auralis is an open-access academic archive and clinical simulation suite dedicated to Audiology students, researchers, faculty, and clinicians worldwide. Designed to elevate hearing science education.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-500">
              <a 
                href="/rss.xml" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono hover:text-cyan-500 transition-colors"
                title="Auralis RSS Feed"
              >
                <Rss className="w-3 h-3 text-orange-500" />
                <span>RSS Feed</span>
              </a>
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono hover:text-cyan-500 transition-colors"
                title="Sitemap XML"
              >
                <FileCode className="w-3 h-3 text-cyan-500" />
                <span>Sitemap XML</span>
              </a>
            </div>
          </div>

          {/* Col 3: Academic Modules */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
              Academic Hub
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-cyan-500 transition-colors text-left">
                  Platform Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-cyan-500 transition-colors text-left">
                  Curriculum Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('teachers')} className="hover:text-cyan-500 transition-colors text-left">
                  Faculty Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('videos')} className="hover:text-cyan-500 transition-colors text-left">
                  Video Lectures
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('research')} className="hover:text-cyan-500 transition-colors text-left">
                  Research Papers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('books')} className="hover:text-cyan-500 transition-colors text-left">
                  Clinical Textbooks
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Simulators & Tools */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
              Simulators &amp; Tools
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('anatomy')} className="hover:text-cyan-500 transition-colors text-left">
                  3D Ear Anatomy &amp; Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('simulator')} className="hover:text-cyan-500 transition-colors text-left">
                  Audiogram Simulator Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-cyan-500 transition-colors text-left">
                  Clinical Calculators
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cases')} className="hover:text-cyan-500 transition-colors text-left">
                  Patient Case Batteries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('aitutor')} className="hover:text-cyan-500 transition-colors text-left">
                  AI Clinical Partner
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Standards & Compliance */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
              Clinical Standards
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-500">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>ANSI S3.6 Pure Tone</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>ISO 8253 Testing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>NIOSH Exposure REL</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>Mueller-Killion SII</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                <span>WCAG 2.1 AA Accessible</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Accessibility Bar */}
        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Auralis Open Audiology Platform. Free for non-commercial educational &amp; research use.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-cyan-500 transition-colors">
              About
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-cyan-500 transition-colors">
              Contact
            </button>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">
              Robots.txt
            </a>
            <span className="flex items-center gap-1 text-zinc-400">
              <span>Crafted for Audiological Science</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
