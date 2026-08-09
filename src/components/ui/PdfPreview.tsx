import React, { useState } from 'react';
import { FileText, Download, Eye, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

export interface PdfPreviewProps {
  title?: string;
  author?: string;
  pages?: number;
  fileSize?: string;
  pdfUrl?: string;
  className?: string;
}

export const PdfPreview: React.FC<PdfPreviewProps> = ({
  title = 'ANSI S3.6-2018 Specification for Audiometers & Reference Thresholds',
  author = 'American National Standards Institute',
  pages = 24,
  fileSize = '3.2 MB',
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl space-y-0 ${className}`}>
      {/* Header Toolbar */}
      <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-white text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold font-display line-clamp-1">{title}</h4>
            <span className="text-[10px] text-zinc-400 font-mono">{author} • {fileSize}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 font-mono text-[11px]">
            <button
              onClick={() => setZoom(Math.max(75, zoom - 25))}
              className="p-1 hover:text-cyan-400"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-zinc-300">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(150, zoom + 25))}
              className="p-1 hover:text-cyan-400"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Download Button */}
          <button
            onClick={() => alert(`Downloading: ${title}`)}
            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Virtual Document Page Container */}
      <div className="p-8 bg-zinc-950/50 flex justify-center overflow-auto min-h-[350px]">
        <div
          className="bg-white text-zinc-900 p-8 sm:p-12 rounded-xl shadow-2xl max-w-xl w-full space-y-6 transition-all duration-200 border border-zinc-200"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          <div className="border-b border-zinc-200 pb-4 space-y-1">
            <span className="text-[10px] font-mono font-bold text-cyan-600 uppercase">Standard Specification Document</span>
            <h2 className="text-base sm:text-lg font-bold font-display text-zinc-900">{title}</h2>
            <p className="text-[11px] text-zinc-500">Section 4.2 — Earphone Calibration & RETSPL Standard Curves</p>
          </div>

          <div className="space-y-3 text-xs text-zinc-600 leading-relaxed font-serif">
            <p>
              This standard specifies requirements for audiometers designed primarily for use in determining hearing threshold levels in comparison with standard reference threshold levels.
            </p>
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[11px] font-mono text-zinc-800">
              Table 1: RETSPL values for TDH-39 earphones in NBS 9-A coupler (dB SPL)<br />
              125Hz: 45.0 dB | 250Hz: 25.5 dB | 500Hz: 11.5 dB | 1000Hz: 7.0 dB | 2000Hz: 9.0 dB | 4000Hz: 9.5 dB
            </div>
            <p>
              Pure-tone audiometers shall provide acoustic test signals generated at discrete audiometric frequencies ranging from 125 Hz to 8000 Hz with sound pressure level accuracy within ±3 dB.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex justify-between items-center text-[10px] font-mono text-zinc-400">
            <span>ANSI S3.6-2018 Standard</span>
            <span>Page {currentPage} of {pages}</span>
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-zinc-400 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>Page {currentPage} of {pages}</span>
          <button
            onClick={() => setCurrentPage(Math.min(pages, currentPage + 1))}
            disabled={currentPage === pages}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <span className="text-[10px] text-emerald-400 font-bold">Verified PDF Document</span>
      </div>
    </div>
  );
};
