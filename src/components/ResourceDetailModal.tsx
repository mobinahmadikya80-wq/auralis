import React from 'react';
import { 
  X, 
  Bookmark, 
  Download, 
  ExternalLink, 
  FileText, 
  BookOpen, 
  Presentation, 
  Video, 
  FileCheck, 
  CheckCircle2, 
  Star, 
  Clock,
  Sparkles,
  Share2
} from 'lucide-react';
import { EducationalResource } from '../types';

interface ResourceDetailModalProps {
  resource: EducationalResource | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleBookmark: (resource: EducationalResource) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  isSaved,
  onToggleBookmark
}) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-4xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Navigation Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              {resource.topic}
            </span>
            <span className="text-xs text-zinc-500 capitalize">
              {resource.type} • {resource.level} Level
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(resource)}
              className={`p-2 rounded-xl border transition-colors text-xs flex items-center gap-1.5 font-medium ${
                isSaved
                  ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30'
                  : 'text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Header Info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display leading-tight">
              {resource.title}
            </h1>
            
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                Author: {resource.author}
              </span>
              {resource.institution && (
                <span>• {resource.institution}</span>
              )}
              <span className="flex items-center gap-1 font-mono text-zinc-400">
                <Clock className="w-3.5 h-3.5" />
                {resource.readTimeOrDuration}
              </span>
            </div>
          </div>

          {/* YouTube Video Embed Player if Video */}
          {resource.type === 'video' && resource.videoYoutubeId && (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-zinc-800">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${resource.videoYoutubeId}`}
                title={resource.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* PDF Book / Slide Deck Preview Banner */}
          {(resource.type === 'book' || resource.type === 'slides') && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                  {resource.type === 'book' ? <BookOpen className="w-4 h-4" /> : <Presentation className="w-4 h-4" />}
                  <span>{resource.type === 'book' ? `PDF Textbook (${resource.pdfPages} Pages)` : `Slide Deck (${resource.slidesCount} Slides)`}</span>
                </div>
                <h3 className="text-base font-bold">{resource.title}</h3>
                <p className="text-xs text-zinc-400">
                  Open educational file size: {resource.fileSize || '12.4 MB'}
                </p>
              </div>

              <a
                href={resource.downloadUrl || '#'}
                download
                target={resource.downloadUrl ? '_blank' : undefined}
                rel={resource.downloadUrl ? 'noopener noreferrer' : undefined}
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Download Free {resource.type === 'book' ? 'PDF' : 'PPTX'}</span>
              </a>
            </div>
          )}

          {/* Markdown Content Reader if Notes */}
          {resource.contentMarkdown && (
            <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-4 bg-zinc-50 dark:bg-zinc-950/60 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 font-sans">
              <div className="whitespace-pre-wrap font-sans text-zinc-800 dark:text-zinc-200">
                {resource.contentMarkdown}
              </div>
            </div>
          )}

          {/* Description Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Educational Summary & Scope
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-100/50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              {resource.description}
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Clinical Keywords & Descriptors
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {resource.tags.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  #{t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            Auralis Open Access Repository License
          </span>

          <div className="flex items-center gap-3">
            {resource.externalLink && (
              <a
                href={resource.externalLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Journal DOI / Publisher</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
