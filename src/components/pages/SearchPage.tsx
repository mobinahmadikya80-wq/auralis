import React, { useState } from 'react';
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
  Sparkles, 
  File
} from 'lucide-react';
import { getCourses, getTeachers, getVideos, getBooks, getResearchPapers, getDownloads } from '../../content/loader';
import { EDUCATIONAL_RESOURCES } from '../../data/resources';
import { EducationalResource } from '../../types';

interface SearchPageProps {
  onSelectResource: (res: EducationalResource) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onSelectResource }) => {
  const courses = getCourses();
  const teachers = getTeachers();
  const videos = getVideos();
  const books = getBooks();
  const research = getResearchPapers();
  const downloads = getDownloads();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Build searchable repository
  const items: Array<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
    category: 'Courses' | 'Teachers' | 'Videos' | 'Books' | 'Slides' | 'Research' | 'PDF' | 'Anatomy' | 'Cases';
    typeBadge: string;
    icon: React.ComponentType<{ className?: string }>;
    tags: string[];
    onOpen: () => void;
  }> = [];

  // Courses
  courses.forEach(c => {
    items.push({
      id: `course_${c.id}`,
      title: c.title,
      subtitle: `${c.code} • ${c.level} • ${c.duration}`,
      description: c.description,
      category: 'Courses',
      typeBadge: c.code,
      icon: BookOpen,
      tags: c.syllabus || [],
      onOpen: () => {
        const matchingRes = EDUCATIONAL_RESOURCES[0];
        onSelectResource(matchingRes);
      }
    });
  });

  // Teachers
  teachers.forEach(t => {
    items.push({
      id: `teacher_${t.id}`,
      title: t.name,
      subtitle: `${t.role} • ${t.institution}`,
      description: `Specializing in ${(t.specialties || []).join(', ')}`,
      category: 'Teachers',
      typeBadge: 'Faculty',
      icon: Users,
      tags: t.specialties || [],
      onOpen: () => {}
    });
  });

  // Videos
  videos.forEach(v => {
    items.push({
      id: `vid_${v.id}`,
      title: v.title,
      subtitle: `Instructor: ${v.author} • Duration: ${v.duration}`,
      description: v.description,
      category: 'Videos',
      typeBadge: 'Video Lecture',
      icon: Video,
      tags: [v.category],
      onOpen: () => {}
    });
  });

  // Books
  books.forEach(b => {
    items.push({
      id: `book_${b.id}`,
      title: b.title,
      subtitle: `By ${b.authors} • Edition: ${b.edition}`,
      description: b.desc,
      category: 'Books',
      typeBadge: 'Textbook',
      icon: Book,
      tags: b.topics || [],
      onOpen: () => {}
    });
  });

  // Research Papers
  research.forEach(r => {
    items.push({
      id: `research_${r.id}`,
      title: r.title,
      subtitle: `${r.authors} • ${r.journal} (${r.date})`,
      description: r.abstract,
      category: 'Research',
      typeBadge: 'Paper',
      icon: FileCheck,
      tags: ['Research', r.journal],
      onOpen: () => {}
    });
  });

  // Downloads
  downloads.forEach(d => {
    items.push({
      id: `dl_${d.id}`,
      title: d.name,
      subtitle: `${d.size} • ${d.type}`,
      description: d.desc,
      category: 'PDF',
      typeBadge: d.type.toUpperCase(),
      icon: FileText,
      tags: [d.type],
      onOpen: () => {}
    });
  });

  // Static Educational Resources
  EDUCATIONAL_RESOURCES.forEach(res => {
    const isBook = res.type === 'book';
    const isSlides = res.type === 'slides';
    const isVid = res.type === 'video';
    const isPaper = res.type === 'paper';

    items.push({
      id: `edu_${res.id}`,
      title: res.title,
      subtitle: `${res.topic} • By ${res.author} • ${res.readTimeOrDuration}`,
      description: res.description,
      category: isBook ? 'Books' : isSlides ? 'Slides' : isVid ? 'Videos' : isPaper ? 'Research' : 'Courses',
      typeBadge: res.type.toUpperCase(),
      icon: isBook ? Book : isSlides ? Presentation : isVid ? Video : FileText,
      tags: res.tags || [],
      onOpen: () => onSelectResource(res)
    });
  });

  // Filter Items
  const qLower = query.trim().toLowerCase();

  const filtered = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    if (!matchesCategory) return false;

    if (!qLower) return true;

    const matchesTitle = item.title.toLowerCase().includes(qLower);
    const matchesSub = item.subtitle.toLowerCase().includes(qLower);
    const matchesDesc = item.description.toLowerCase().includes(qLower);
    const matchesTag = item.tags.some(t => t.toLowerCase().includes(qLower));

    return matchesTitle || matchesSub || matchesDesc || matchesTag;
  });

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'courses', label: 'Courses' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'videos', label: 'Videos' },
    { id: 'books', label: 'Books' },
    { id: 'slides', label: 'Slides' },
    { id: 'research', label: 'Research' },
    { id: 'pdf', label: 'PDFs' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-500 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Instant Search Engine • Phase 11</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white font-display">
            Auralis Unified Search System
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Instant search across Courses, Teachers, Videos, Books, Slides, Research Papers, PDFs, and Tags with zero-latency client index.
          </p>
        </div>

        {/* Input & Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search everything: ABR latency, VNG, Otoscopy, Carhart notch, SII count-the-dots, REM targets..."
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-inner font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-2 rounded-xl font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === c.id
                    ? 'bg-cyan-500 text-zinc-950 shadow-md scale-102 font-black'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-2 font-mono">
        <span>Found {filtered.length} matching resources in archive</span>
        {query && <span>Filtering for query: "{query}"</span>}
      </div>

      {/* Grid Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={item.onOpen}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-cyan-500/50 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {item.typeBadge} • {item.category}
                  </span>
                  <Icon className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="text-[11px] text-zinc-400 font-mono">
                  {item.subtitle}
                </div>
              </div>

              {item.tags.length > 0 && (
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-1.5">
                  {item.tags.map((tag, tid) => (
                    <span
                      key={tid}
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuery(tag);
                      }}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
            <Search className="w-10 h-10 text-zinc-400 mx-auto opacity-40 animate-pulse" />
            <div className="text-base font-bold text-zinc-600 dark:text-zinc-300">
              No matching resources found for "{query}"
            </div>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Try adjusting your search query or selecting a different category filter above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
