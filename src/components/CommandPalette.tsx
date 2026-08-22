import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  Users, 
  Video, 
  Book, 
  Presentation, 
  FileCheck, 
  FileText, 
  Ear, 
  Stethoscope, 
  ChevronRight,
  Clock,
  Sparkles,
  CornerDownLeft,
  File
} from 'lucide-react';
import { getCourses, getTeachers, getVideos, getBooks, getResearchPapers, getDownloads } from '../content/loader';
import { EDUCATIONAL_RESOURCES } from '../data/resources';
import { ANATOMICAL_STRUCTURES } from '../data/anatomy';
import { CLINICAL_CASES } from '../data/cases';

export type SearchCategoryFilter = 'all' | 'courses' | 'teachers' | 'videos' | 'books' | 'slides' | 'research' | 'pdf' | 'tags';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
  onSelectResource: (resourceId: string) => void;
}

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Courses' | 'Teachers' | 'Videos' | 'Books' | 'Slides' | 'Research' | 'PDF' | 'Anatomy' | 'Cases' | 'Tags';
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onSelectResource
}) => {
  const courses = getCourses();
  const teachers = getTeachers();
  const videos = getVideos();
  const books = getBooks();
  const research = getResearchPapers();
  const downloads = getDownloads();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategoryFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(['ABR Latency', 'Cochlear Implant', 'VNG', 'Tinnitus']);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Construct Unified Index from CMS & Static Datasets
  const allSearchItems: SearchItem[] = [];

  // 1. Courses
  courses.forEach(c => {
    allSearchItems.push({
      id: `course_${c.id}`,
      title: c.title,
      subtitle: `${c.code} • ${c.level} • ${c.duration}`,
      description: c.description,
      category: 'Courses',
      badge: c.code,
      icon: BookOpen,
      tags: c.syllabus || [],
      action: () => {
        onSelectTab('courses');
        onClose();
      }
    });
  });

  // 2. Teachers
  teachers.forEach(t => {
    allSearchItems.push({
      id: `teacher_${t.id}`,
      title: t.name,
      subtitle: `${t.role} • ${t.institution}`,
      description: `Specializing in ${(t.specialties || []).join(', ')}`,
      category: 'Teachers',
      badge: 'Faculty',
      icon: Users,
      tags: t.specialties || [],
      action: () => {
        onSelectTab('teachers');
        onClose();
      }
    });
  });

  // 3. Videos
  videos.forEach(v => {
    allSearchItems.push({
      id: `vid_${v.id}`,
      title: v.title,
      subtitle: `Instructor: ${v.author} • Duration: ${v.duration}`,
      description: v.description,
      category: 'Videos',
      badge: 'Video Lecture',
      icon: Video,
      tags: [v.category],
      action: () => {
        onSelectTab('videos');
        onClose();
      }
    });
  });

  // 4. Books
  books.forEach(b => {
    allSearchItems.push({
      id: `book_${b.id}`,
      title: b.title,
      subtitle: `By ${b.authors} • Edition: ${b.edition}`,
      description: b.desc,
      category: 'Books',
      badge: 'Textbook',
      icon: Book,
      tags: b.topics || [],
      action: () => {
        onSelectTab('books');
        onClose();
      }
    });
  });

  // 5. Research Papers
  research.forEach(r => {
    allSearchItems.push({
      id: `research_${r.id}`,
      title: r.title,
      subtitle: `${r.authors} • ${r.journal} (${r.date})`,
      description: r.abstract,
      category: 'Research',
      badge: 'Paper',
      icon: FileCheck,
      tags: ['Research', r.journal],
      action: () => {
        onSelectTab('research');
        onClose();
      }
    });
  });

  // 6. Downloads
  downloads.forEach(d => {
    allSearchItems.push({
      id: `dl_${d.id}`,
      title: d.name,
      subtitle: `${d.size} • ${d.type}`,
      description: d.desc,
      category: 'PDF',
      badge: d.type.toUpperCase(),
      icon: FileText,
      tags: [d.type],
      action: () => {
        onSelectTab('downloads');
        onClose();
      }
    });
  });

  // 7. Static Educational Resources
  EDUCATIONAL_RESOURCES.forEach(res => {
    const isBook = res.type === 'book';
    const isSlides = res.type === 'slides';
    const isVid = res.type === 'video';
    const isPaper = res.type === 'paper';

    allSearchItems.push({
      id: `edu_${res.id}`,
      title: res.title,
      subtitle: `${res.topic} • By ${res.author} • ${res.readTimeOrDuration}`,
      description: res.description,
      category: isBook ? 'Books' : isSlides ? 'Slides' : isVid ? 'Videos' : isPaper ? 'Research' : 'Courses',
      badge: res.type.toUpperCase(),
      icon: isBook ? Book : isSlides ? Presentation : isVid ? Video : FileText,
      tags: res.tags || [],
      action: () => {
        onSelectResource(res.id);
        onClose();
      }
    });
  });

  // 8. Anatomical Structures
  ANATOMICAL_STRUCTURES.forEach(anat => {
    allSearchItems.push({
      id: `anat_${anat.id}`,
      title: `${anat.name} (${anat.latinName || 'Ear'})`,
      subtitle: `${anat.region} Ear Anatomical Structure`,
      description: anat.description,
      category: 'Anatomy',
      badge: `${anat.region} Ear`,
      icon: Ear,
      tags: [anat.region, 'Anatomy', '3D'],
      action: () => {
        onSelectTab('anatomy');
        onClose();
      }
    });
  });

  // 9. Clinical Cases
  CLINICAL_CASES.forEach(c => {
    allSearchItems.push({
      id: `case_${c.id}`,
      title: c.title,
      subtitle: `Patient: ${c.patientAge}y/o ${c.patientGender} • Diagnosis: ${c.correctDiagnosis}`,
      description: c.historyOfPresentIllness,
      category: 'Cases',
      badge: 'Case Study',
      icon: Stethoscope,
      tags: [c.chiefComplaint, 'Clinical', 'Case'],
      action: () => {
        onSelectTab('cases');
        onClose();
      }
    });
  });

  // Filter Items by Category & Search Query
  const qLower = query.trim().toLowerCase();

  const filteredItems = allSearchItems.filter(item => {
    // Category match
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'courses' && item.category !== 'Courses') return false;
      if (selectedCategory === 'teachers' && item.category !== 'Teachers') return false;
      if (selectedCategory === 'videos' && item.category !== 'Videos') return false;
      if (selectedCategory === 'books' && item.category !== 'Books') return false;
      if (selectedCategory === 'slides' && item.category !== 'Slides') return false;
      if (selectedCategory === 'research' && item.category !== 'Research') return false;
      if (selectedCategory === 'pdf' && item.category !== 'PDF') return false;
      if (selectedCategory === 'tags' && !item.tags.some(t => t.toLowerCase().includes(qLower))) return false;
    }

    if (!qLower) return true;

    // Search query match
    const titleMatch = item.title.toLowerCase().includes(qLower);
    const subMatch = item.subtitle.toLowerCase().includes(qLower);
    const descMatch = item.description.toLowerCase().includes(qLower);
    const tagMatch = item.tags.some(t => t.toLowerCase().includes(qLower));

    return titleMatch || subMatch || descMatch || tagMatch;
  });

  // Keyboard Arrow Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          if (query.trim() && !recentSearches.includes(query.trim())) {
            setRecentSearches(prev => [query.trim(), ...prev.slice(0, 4)]);
          }
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, query, recentSearches, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const categories: { id: SearchCategoryFilter; label: string; count?: number }[] = [
    { id: 'all', label: 'همه', count: allSearchItems.length },
    { id: 'courses', label: 'دروس', count: allSearchItems.filter(i => i.category === 'Courses').length },
    { id: 'teachers', label: 'اساتید', count: allSearchItems.filter(i => i.category === 'Teachers').length },
    { id: 'videos', label: 'ویدیوها', count: allSearchItems.filter(i => i.category === 'Videos').length },
    { id: 'books', label: 'کتاب‌ها', count: allSearchItems.filter(i => i.category === 'Books').length },
    { id: 'slides', label: 'اسلایدها', count: allSearchItems.filter(i => i.category === 'Slides').length },
    { id: 'research', label: 'پژوهش', count: allSearchItems.filter(i => i.category === 'Research').length },
    { id: 'pdf', label: 'PDFها', count: allSearchItems.filter(i => i.category === 'PDF').length },
    { id: 'tags', label: 'برچسب‌ها' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-zinc-950/70 backdrop-blur-md transition-all animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Header Input */}
        <div className="flex items-center px-5 py-3 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
          <Search className="w-5 h-5 text-cyan-500 mr-3.5 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="جست‌وجو در دروس، اساتید، ویدیوها، کتاب‌ها، اسلایدها، پژوهش..."
            className="w-full py-2.5 text-sm sm:text-base bg-transparent border-0 focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-[10px] font-mono text-zinc-500 font-bold shrink-0">
            برای خروج ESC
          </span>
        </div>

        {/* Category Filter Tabs */}
        <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-950/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-zinc-950 shadow-sm font-black'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <span>{cat.label}</span>
              {cat.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  selectedCategory === cat.id ? 'bg-zinc-950 text-cyan-400' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                }`}>
                  {cat.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Quick Recent Searches pills if query is empty */}
        {!query && (
          <div className="px-5 py-2.5 bg-zinc-100/50 dark:bg-zinc-900/30 border-b border-zinc-200/60 dark:border-zinc-800/40 flex items-center gap-2 text-xs text-zinc-500 overflow-x-auto">
            <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="font-bold text-[11px] uppercase tracking-wider shrink-0 text-zinc-400">اخیر:</span>
            {recentSearches.map((term, i) => (
              <button
                key={i}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 hover:border-cyan-500/50 text-zinc-700 dark:text-zinc-300 hover:text-cyan-500 transition-colors shrink-0 text-xs"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-3 space-y-1 max-h-[55vh] divide-y-0">
          {filteredItems.map((item, index) => {
            const Icon = item.icon;
            const isSelected = index === selectedIndex;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (query.trim() && !recentSearches.includes(query.trim())) {
                    setRecentSearches(prev => [query.trim(), ...prev.slice(0, 4)]);
                  }
                  item.action();
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-cyan-500/10 border-2 border-cyan-500/40 shadow-sm'
                    : 'bg-transparent border-2 border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0 pr-3">
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    isSelected ? 'bg-cyan-500 text-zinc-950' : 'bg-zinc-100 dark:bg-zinc-800 text-cyan-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span dir="auto" className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {item.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-zinc-200/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300/50 dark:border-zinc-700">
                        {item.badge}
                      </span>
                    </div>

                    <div dir="auto" className="text-xs text-zinc-500 truncate">
                      {item.subtitle}
                    </div>

                    <p dir="auto" className="text-[11px] text-zinc-400 line-clamp-1 leading-snug">
                      {item.description}
                    </p>

                    {item.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                        {item.tags.slice(0, 4).map((tag, tid) => (
                          <span
                            key={tid}
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuery(tag);
                              setSelectedCategory('all');
                            }}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 cursor-pointer transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isSelected && (
                    <span className="text-[11px] font-mono text-cyan-500 font-bold hidden sm:flex items-center gap-1">
                      اینتر <CornerDownLeft className="w-3 h-3" />
                    </span>
                  )}
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-500 translate-x-1' : 'text-zinc-400'}`} />
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="py-16 text-center space-y-3">
              <Search className="w-10 h-10 text-zinc-400 mx-auto opacity-40 animate-pulse" />
              <div className="text-sm font-bold text-zinc-500">موردی برای "{query}" پیدا نشد</div>
              <div className="text-xs text-zinc-400">عباراتی مثل ABR، آدیوگرام، VNG یا اسم استاد رو امتحان کن.</div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/80 text-xs text-zinc-500 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">↓</kbd> جابه‌جایی
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">↵</kbd> انتخاب
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">ESC</kbd> بستن
            </span>
          </div>

          <div className="text-[11px] font-mono text-cyan-500 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>موتور جست‌وجو فعال ({filteredItems.length} مورد نمایه‌شده)</span>
          </div>
        </div>

      </div>
    </div>
  );
};
