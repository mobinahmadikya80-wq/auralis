import React, { useState } from 'react';
import { 
  FileText, 
  BookOpen, 
  Video, 
  FileCheck, 
  Presentation, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Bookmark, 
  Download, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { EducationalResource, ResourceType, CategoryTopic } from '../types';
import { EDUCATIONAL_RESOURCES } from '../data/resources';

interface ResourceHubProps {
  onSelectResource: (resource: EducationalResource) => void;
  savedIds: string[];
  onToggleBookmark: (resource: EducationalResource) => void;
}

export const ResourceHub: React.FC<ResourceHubProps> = ({
  onSelectResource,
  savedIds,
  onToggleBookmark
}) => {
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<CategoryTopic | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const typesList: { id: ResourceType | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'note', label: 'Course Notes', icon: FileText },
    { id: 'book', label: 'PDF Textbooks', icon: BookOpen },
    { id: 'slides', label: 'Slide Decks', icon: Presentation },
    { id: 'video', label: 'Lectures & Videos', icon: Video },
    { id: 'paper', label: 'Research Papers', icon: FileCheck },
  ];

  const topicsList: CategoryTopic[] = [
    'Anatomy & Physiology',
    'Psychoacoustics',
    'Pediatric Audiology',
    'Vestibular & Balance',
    'Electrophysiology (ABR/OAE)',
    'Hearing Aids & Amplification',
    'Cochlear Implants',
    'Tinnitus & Hyperacusis',
    'Auditory Processing (APD)'
  ];

  const filteredResources = EDUCATIONAL_RESOURCES.filter((res) => {
    if (selectedType !== 'all' && res.type !== selectedType) return false;
    if (selectedTopic !== 'all' && res.topic !== selectedTopic) return false;
    if (selectedLevel !== 'all' && res.level !== selectedLevel) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchDesc = res.description.toLowerCase().includes(q);
      const matchTopic = res.topic.toLowerCase().includes(q);
      const matchTags = res.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTopic && !matchTags) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Header & Filter Controls */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white font-display flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-500" />
              Audiology Educational Archive
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Browse open-access course outlines, peer-reviewed textbooks, slide decks, video lectures, and clinical papers.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
            />
          </div>
        </div>

        {/* Format Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-zinc-100 dark:border-zinc-800/80">
          {typesList.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedType === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                    : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400 dark:text-cyan-600' : 'text-zinc-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Topic Dropdown & Complexity Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-zinc-400 flex items-center gap-1 font-medium">
              <Filter className="w-3.5 h-3.5" /> Topic:
            </span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value as CategoryTopic | 'all')}
              className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none"
            >
              <option value="all">All Topics (9 Categories)</option>
              {topicsList.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-medium">Level:</span>
            {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {lvl === 'all' ? 'All Levels' : lvl}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Grid of Educational Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const isSaved = savedIds.includes(res.id);

          return (
            <div
              key={res.id}
              className="group bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/90 dark:border-zinc-800/90 shadow-sm hover:shadow-xl hover:border-cyan-500/30 transition-all duration-200 flex flex-col justify-between relative"
            >
              {/* Card Header & Badge */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {res.topic}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(res);
                    }}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isSaved
                        ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30'
                        : 'text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-200'
                    }`}
                    title={isSaved ? 'Remove Bookmark' : 'Save Resource'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                {/* Resource Title */}
                <h3 
                  onClick={() => onSelectResource(res)}
                  className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
                >
                  {res.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {res.description}
                </p>
              </div>

              {/* Author & Footer Meta */}
              <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 space-y-4">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span className="font-medium truncate max-w-[180px] text-zinc-700 dark:text-zinc-300">
                    {res.author}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    {res.readTimeOrDuration}
                  </span>
                </div>

                {/* Tags row */}
                <div className="flex flex-wrap gap-1">
                  {res.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={() => onSelectResource(res)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-zinc-950 transition-colors shadow-sm"
                >
                  <span>Open Educational Resource</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-12 text-center border border-zinc-200 dark:border-zinc-800 space-y-3">
          <BookOpen className="w-10 h-10 text-zinc-400 mx-auto" />
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">No resources found matching filters</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try adjusting your topic selection, keyword query, or resource format filter.
          </p>
        </div>
      )}

    </div>
  );
};
