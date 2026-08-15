import React from 'react';
import { BookOpen, Bookmark, Star, Download, ExternalLink, Library } from 'lucide-react';
import { getBooks } from '../../content/loader';

export const BooksPage: React.FC = () => {
  const books = getBooks();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Core Academic Textbooks</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          Audiology Reference Textbooks & Handbooks
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Digital open access textbook library covering clinical diagnostics, electrophysiology, pediatric audiology, and physical acoustics.
        </p>
      </div>

      {/* Books List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {books.map((b, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-6 hover:border-cyan-500/50 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-500 px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {b.edition}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" /> {b.rating}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                  {b.title}
                </h3>
                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mt-1">
                  Authors: {b.authors}
                </p>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {b.desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {(b.topics || []).map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4 text-xs">
              <span className="text-zinc-400">{b.publisher}</span>
              {b.fileUrl ? (
                <a
                  href={b.fileUrl}
                  download
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <span>Download e-Book</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-zinc-400 italic">No file linked yet</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
