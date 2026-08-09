import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  caption?: string;
  category?: string;
}

export interface GalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const Gallery: React.FC<GalleryProps> = ({
  images,
  columns = 3,
  className = '',
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeImage = lightboxIndex !== null ? images[lightboxIndex] : null;

  const colStyles = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const prev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1);
    }
  };

  const next = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className={`grid ${colStyles[columns]} gap-4`}>
        {images.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 cursor-pointer aspect-video sm:aspect-square flex items-center justify-center"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">
                {img.category || 'Anatomical Image'}
              </span>
              <h4 className="text-xs sm:text-sm font-bold font-display leading-tight">{img.title}</h4>
              {img.caption && <p className="text-[10px] text-zinc-300 line-clamp-1">{img.caption}</p>}
            </div>
            <div className="absolute top-3 right-3 p-2 rounded-xl bg-zinc-950/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={prev}
            className="absolute left-4 sm:left-8 p-3 rounded-2xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-4 sm:right-8 p-3 rounded-2xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center">
            <div className="w-full max-h-[70vh] flex items-center justify-center bg-black/50 p-4">
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="max-h-[65vh] w-auto object-contain rounded-xl"
              />
            </div>
            <div className="w-full p-6 space-y-2 border-t border-zinc-800 text-white">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>{activeImage.category}</span>
                <span>{lightboxIndex! + 1} of {images.length}</span>
              </div>
              <h3 className="text-lg font-bold font-display">{activeImage.title}</h3>
              {activeImage.caption && (
                <p className="text-xs text-zinc-300 leading-relaxed">{activeImage.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
