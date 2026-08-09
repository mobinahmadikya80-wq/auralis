import React, { useState } from 'react';
import { 
  Bookmark, 
  FileText, 
  Plus, 
  Trash2, 
  BookOpen, 
  Save, 
  Check, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { EducationalResource, NoteItem } from '../types';

interface SavedWorkspaceProps {
  savedResources: EducationalResource[];
  onSelectResource: (resource: EducationalResource) => void;
  onRemoveSaved: (resource: EducationalResource) => void;
  notes: NoteItem[];
  onSaveNote: (note: NoteItem) => void;
  onDeleteNote: (id: string) => void;
}

export const SavedWorkspace: React.FC<SavedWorkspaceProps> = ({
  savedResources,
  onSelectResource,
  onRemoveSaved,
  notes,
  onSaveNote,
  onDeleteNote
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'notes'>('bookmarks');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  const handleCreateNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    const item: NoteItem = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
      updatedAt: new Date().toLocaleDateString()
    };
    onSaveNote(item);
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Workspace Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Personal Audiology Study Workspace</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display mt-2">
              Saved Bookmarks & Study Notebook
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Access your bookmarked textbooks, clinical lecture notes, case studies, and personal study journals.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setActiveSubTab('bookmarks')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'bookmarks'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Saved Bookmarks ({savedResources.length})
            </button>
            <button
              onClick={() => setActiveSubTab('notes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'notes'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Study Notes ({notes.length})
            </button>
          </div>
        </div>
      </div>

      {/* Bookmarks Tab */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-6">
          {savedResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedResources.map((res) => (
                <div
                  key={res.id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      {res.topic}
                    </span>
                    <h3 
                      onClick={() => onSelectResource(res)}
                      className="text-base font-bold text-zinc-900 dark:text-white hover:text-cyan-500 cursor-pointer transition-colors"
                    >
                      {res.title}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2">
                      {res.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4 text-xs">
                    <button
                      onClick={() => onSelectResource(res)}
                      className="text-cyan-500 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Open Material</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onRemoveSaved(res)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-200 dark:border-zinc-800 space-y-3">
              <Bookmark className="w-10 h-10 text-zinc-400 mx-auto" />
              <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">No saved bookmarks yet</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Explore the Resource Hub or Clinical Cases and click the bookmark icon to save key learning items for later review.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Notes Tab */}
      {activeSubTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Note Editor (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-500" /> Create Custom Clinical Study Note
            </h3>

            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Note Title e.g. 'Key ABR Peak Latency Takeaways'..."
              className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm font-semibold focus:outline-none"
            />

            <textarea
              rows={8}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Write lecture summary, clinical formulas, or case notes here..."
              className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
            />

            <button
              onClick={handleCreateNote}
              disabled={!newNoteTitle.trim() || !newNoteContent.trim()}
              className="py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              {isNoteSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{isNoteSaved ? 'Note Saved to Journal!' : 'Save Note'}</span>
            </button>
          </div>

          {/* Notes List (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display">
              Saved Journal Entries ({notes.length})
            </h3>

            {notes.length > 0 ? (
              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                {notes.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{n.title}</h4>
                      <button
                        onClick={() => onDeleteNote(n.id)}
                        className="text-zinc-400 hover:text-rose-500 p-1"
                        title="Delete Note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed whitespace-pre-wrap">
                      {n.content}
                    </p>

                    <span className="text-[10px] font-mono text-zinc-400 block pt-1">
                      Saved on {n.updatedAt}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-zinc-400">
                No custom notes written yet. Use the editor to take study notes!
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
