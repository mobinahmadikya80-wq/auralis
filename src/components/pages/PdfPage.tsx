import React from 'react';
import { FileText, Download } from 'lucide-react';
import { EDUCATIONAL_RESOURCES } from '../../data/resources';

export const PdfPage: React.FC = () => {
  const pdfManuals = EDUCATIONAL_RESOURCES.filter((r) => r.type === 'note' || r.type === 'paper');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <FileText className="w-3.5 h-3.5" />
          <span>Clinical PDF Manuals & Guidelines</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display">
          Audiological Standards & Printable Clinical PDFs
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Download certified ANSI/ISO specifications, clinical guidelines, and research papers for offline study and clinical reference.
        </p>
      </div>

      {/* Manuals List */}
      {pdfManuals.length === 0 ? (
        <div className="text-center text-sm text-zinc-500 py-12">
          No PDF documents published yet. Add one from the admin panel (Resource Hub, type: note or paper).
        </div>
      ) : (
        <div className="space-y-4">
          {pdfManuals.map((pdf) => (
            <div
              key={pdf.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-cyan-500/40 transition-all"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                  <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 font-bold border border-red-500/20">PDF</span>
                  {pdf.pdfPages ? <span>{pdf.pdfPages} Pages</span> : null}
                  {pdf.fileSize ? (
                    <>
                      <span>•</span>
                      <span>{pdf.fileSize}</span>
                    </>
                  ) : null}
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display">
                  {pdf.title}
                </h3>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {pdf.description}
                </p>

                <div className="text-[11px] text-zinc-400 font-semibold">
                  Issuer: {pdf.author}{pdf.institution ? ` — ${pdf.institution}` : ''}
                </div>
              </div>

              {pdf.downloadUrl ? (
                <a
                  href={pdf.downloadUrl}
                  download
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center gap-2 shrink-0 shadow-md shadow-cyan-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
              ) : (
                <span className="text-zinc-400 italic text-xs shrink-0">No file linked yet</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
